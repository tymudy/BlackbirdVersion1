import { Component, Input } from '@angular/core';

export interface ListSong {
  index?: number;
  artist?: string;
  image?: any[];
  listeners?: string;
  mbid?: string;
  name?: string;
  streamable?: string;
  url?: string;
}

@Component({
  selector: 'list-item',
  template: `
        <div class="avatar"><img [src]="item.image[1]['#text']" alt="Image"/></div>
        <div class="item-content">
            <div>
                <span>{{item.artist}}</span>
                <span>{{item.name}}</span>
            </div>
        </div>  `,
  styleUrls: ['./list-song.scss']
})
export class ListSongComponent {
  @Input()
  item: ListSong;
}
