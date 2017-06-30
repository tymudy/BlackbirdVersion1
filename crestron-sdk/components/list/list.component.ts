import { Component,
         Input,
         OnInit,
         SimpleChanges,
         OnChanges } from '@angular/core';

import { Http } from '@angular/http';
import { ShareService } from '../../services/share/shareService';
import { ChangeEvent } from '../virtual-scroll';

@Component({
  selector: 'list-component',
  templateUrl: './list.component.html',
  styleUrls: ['list.component.css']
})
export class ListComponent implements OnInit, OnChanges {
  @Input('name') name: string;
  @Input('load_type') load_type:string;
  @Input('page_size') page_size: number;
  @Input('loading_indicator') loading_indicator: boolean;
  @Input('min_width') min_width: number;
  @Input('min_height') min_height: number;
  @Input('max_height') max_height: number;
  @Input('max_width') max_width: number;
  @Input('header') header: string;
  @Input('footer') footer: string;


  firstListType: string;
  firstListAttributes: any[] = [];
  secondListAttributes: any[] = [];
  firstListItems: any[] = [];
  indices: ChangeEvent;
  readonly bufferSize: number = 12;

  constructor(private http: Http, private shareService: ShareService) {}

  getItemsForTheFirstScrollableList() {
    this.shareService.getData('assets/slider_list.json').subscribe((data: any) => {
      this.firstListItems = data.attributes;
      this.firstListType = data.type;
      this.firstListAttributes = this.firstListItems.slice(0, this.bufferSize);
    });
  }

  getItemsForTheSecondScrollableList() {
    this.shareService.getData('assets/slider_button_list.json').subscribe((data: any) => {
      this.secondListAttributes = data.items;
    });
  }

  fetchMore(event: ChangeEvent) {
    this.indices = event;
    if (event.end === this.firstListAttributes.length) {
      if (this.firstListAttributes.length < this.firstListItems.length) {
        this.firstListAttributes = this.firstListAttributes.concat(this.firstListItems.slice(this.firstListAttributes.length, this.firstListAttributes.length + this.bufferSize));
      }
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    this.reset();
  }

  reset() {
    this.firstListAttributes = this.firstListItems.slice(0, this.bufferSize);
  }

  ngOnInit (): void {
    this.getItemsForTheFirstScrollableList();
    this.getItemsForTheSecondScrollableList();
  }
}
