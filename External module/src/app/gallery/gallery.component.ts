import {Component, Input, OnInit} from '@angular/core';
import {Http} from '@angular/http';

@Component({
  selector: 'gallery-component',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit{

  menuItems: any[] = [];
  selectedMenuItemIndex: any = -1;
  menuClosed: boolean = true;

  constructor(private http: Http){}

  ngOnInit (): void {
    this.loadItemsForGalleryMenu();
  }

  loadItemsForGalleryMenu(): void {
    this.http.get('assets/gallery_items.json')
      .map(response => response.json())
      .subscribe(data => {
        this.menuItems = data;
      });
  }

  toggleMenuItem(item: number): void {
    this.selectedMenuItemIndex = this.selectedMenuItemIndex === item ? -1 : item;
  }

  toggleMenu(): void {
    this.menuClosed = !this.menuClosed;
  }
}
