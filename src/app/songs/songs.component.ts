import {Component, OnInit, SimpleChanges, OnChanges} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Http} from '@angular/http';

import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/pluck';

import {ListSong} from './list-song.component';
import * as lastfm from '../constants/lastfm';
import {ChangeEvent} from '../virtual-scroll';

@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.scss']
})
export class SongsComponent implements OnInit, OnChanges {
  private id$: Observable<string>;

  protected totalItemsLength: number = -1;
  protected items: ListSong[] = [];
  protected indices: ChangeEvent;
  protected buffer: ListSong[] = [];
  protected readonly bufferSize: number = 30;
  protected defaultItemsLength: number = 100;

  private fstListBusy: Subscription;

  private selectedSong: any;
  private isSelectedSong: boolean;

  constructor(private http: Http, private route: ActivatedRoute) {
  }

  onScrollDown(limit: number) {
    this.fstListBusy = this.http.get(lastfm.ROOT_URL + '?method=track.search&track=believe&api_key=' + lastfm.API_KEY + '&format=json&limit=' + limit)
      .map(res => res.json())
      .subscribe(data => {
        data.results.trackmatches.track.forEach((element: any, index: number) => {
          element['style'] = (index % 2) ? 'odd' : 'even';
          element['index'] = index;
          this.items.push(element);
        });
        this.totalItemsLength = data.results['opensearch:totalResults'];
        this.buffer = this.buffer.length === 0 ? this.sliceFirstChunkOfData() : this.getMoreChunksOfData();
      });
  }
  ngOnChanges(changes: SimpleChanges) {
    this.reset();
  }

  protected reset() {
    this.buffer = this.sliceFirstChunkOfData();
  }

  protected fetchMore(event: ChangeEvent) {
    this.indices = event;
    if (event.end === this.buffer.length) {
      if (this.buffer.length < this.items.length) {
        this.buffer = this.getMoreChunksOfData();
      } else {
        let newDefaultItemsLength: number = this.buffer.length + this.defaultItemsLength;
        this.onScrollDown(newDefaultItemsLength);
      }
    }
  }

  sliceFirstChunkOfData():any {
    return this.items.slice(0, this.bufferSize);
  }

  getMoreChunksOfData():any {
    return this.buffer.concat(this.items.slice(this.buffer.length, this.buffer.length + this.bufferSize));
  }

  ngOnInit() {
    this.id$ = this.route.params.pluck('id');
    this.onScrollDown(this.defaultItemsLength);
  }

  onFstSelect(song: any): void {
    this.toogleSelectedSong();
    this.selectedSong = song;
  }

  onFstGoBack(): void {
    this.toogleSelectedSong();
    setTimeout(() => {
      this.selectedSong = null;
    }, 1000);
  }

  toogleSelectedSong(): void {
    this.isSelectedSong = !this.isSelectedSong;
  }
}
