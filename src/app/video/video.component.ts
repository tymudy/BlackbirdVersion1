import {Component, OnInit, ViewChild} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

import {Chunk} from './Chunk';
import {WindowRefService} from './WindowRefService';

import * as io from 'socket.io-client';

const async = require('async');

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {

  @ViewChild('video') video: any;

  private mediaSource: MediaSource;
  private sourceBuffer: SourceBuffer;

  private window: Window;
  private src: any;

  private chunks: Chunk[];

  private canStream: boolean;

  constructor(private domSanitizer: DomSanitizer) {
    this.window = WindowRefService.nativeWindow;
    this.mediaSource = new MediaSource();
    this.chunks = [];
    this.canStream = true;
  }

  ngOnInit(): void {

    let objectURL = this.window.URL.createObjectURL(this.mediaSource);
    this.src = this.domSanitizer.bypassSecurityTrustResourceUrl(objectURL);

    let context = this;

    this.mediaSource.addEventListener('sourceopen', function () {

      console.log('sourceopen');
      context.initializeSourceBuffer();

      context.sourceBuffer.addEventListener('updateend', function () {

        context.chunks.pop();
        console.log('updateend');
        context.video.nativeElement.play();

        let tempChunk = context.chunks.pop();
        if (tempChunk) {
          console.log('streaming chunk #' + tempChunk.id);
          context.stream(tempChunk, context);
        }
      });

      context.invoke(context);
    });
  }

  initializeSourceBuffer(): void {

    if (this.mediaSource.sourceBuffers.length === 0) {
      this.sourceBuffer = this.mediaSource.addSourceBuffer('video/webm; codecs="vorbis,vp8"');
      console.log('initialized source buffer');
    }
  }

  invoke(context: VideoComponent) {

    listen();

    function listen(): void {

      let socket = io.connect('http://localhost:8080');

      let i = 0;

      socket.emit('video_stream_req', 'get_data');

      socket.on('chunk', function (data: any) {
        let chunk = new Chunk(data, i++);
        context.chunks.push(chunk);
        context.stream(chunk, context);
      });
    }
  }

  stream(chunk: Chunk, context: VideoComponent): void {

    async.series([
      validate,
      addSourceBuffer,
      append
    ], function (err: any, result: any) {
      if (err) {
        console.log(err);
      } else {
        console.log('main callback in the stream method for chunk #' + chunk.id);
      }
    });

    function validate(callback: any): void {

      console.log('validating chunk #' + chunk.id);

      if (chunk === null) {
        callback('null chunk');
      } else {
        callback(null);
      }
    }

    function addSourceBuffer(callback: any): void {
      context.initializeSourceBuffer();
      callback(null);
    }

    function append(callback: any): void {

      try {
        context.sourceBuffer.appendBuffer(chunk.data);
        console.log('appending chunk #' + chunk.id + ' to buffer');
      } catch (e) {
        if (e.name === 'QuotaExceededError') {
          console.log('QuotaExceededError: source buffer is full, can not append any more chunks atm');
        } else if (e.name === 'InvalidStateError') {
          console.log('InvalidStateError: mediaSource.readyState = ' + context.mediaSource.readyState);
          console.log('sourceBuffer.updating = ' + context.sourceBuffer.updating);
        } else {
          console.log(e.name);
        }
      }

      callback(null, 'done');
    }
  }
}
