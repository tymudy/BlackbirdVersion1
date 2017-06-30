import {Component, OnInit} from '@angular/core';
import { Http } from '@angular/http';
/*import { ShareService } from '../../share/shareService';*/

@Component({
  selector:'gallery-list',
  templateUrl:'./gallery-list.component.html',
  styleUrls:['./gallery-list.component.css']
})
export class GalleryListComponent implements OnInit{

  type: string;
  secondListAttributes: any[] = [];
  items: any[] = [];

 /* constructor(private http: Http, private shareService: ShareService) {}

  getItemsForTheFirstScrollableList() {
    this.shareService.getData('assets/slider_list.json').subscribe((data: any) => {
      this.items = data.attributes;
      this.type = data.type;
    });
  }

  getItemsForTheSecondScrollableList() {
    this.shareService.getData('assets/slider_button_list.json').subscribe((data: any) => {
      this.secondListAttributes = data.items;
    });
  }*/

  ngOnInit (): void {
    //this.getItemsForTheFirstScrollableList();
   // this.getItemsForTheSecondScrollableList();
  }
}
