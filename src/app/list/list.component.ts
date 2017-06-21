import {Component, Input, ComponentFactoryResolver, ViewChild, ViewContainerRef, AfterViewInit, OnInit, NgModule, Compiler, ModuleWithComponentFactories, ComponentFactory} from '@angular/core';
import {ListService} from './list.service';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'list-component',
  templateUrl: './list.component.html',
  styleUrls: ['list.component.css'],
  providers: [ButtonComponent]
})
export class ListComponent implements OnInit{
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

  private template: string = `<btn  [name]="'Button'"
      [label]="'Title'"
      [class]="'MyClass'"
      [icon]="'plus'"
      [shape]="'rounded-rectangle'">
  </btn>`;

  @ViewChild('listcontainer', {read: ViewContainerRef})listContainer: ViewContainerRef;

  private itemsList: any[] = [this.template, this.template];

  constructor(private listService: ListService, private componentFactoryResolver: ComponentFactoryResolver, private compiler: Compiler) {}

  ngOnInit (): void {
  }

  addNewItem() {
    this.itemsList.push(this.itemsList.length + 1);
  }
}
