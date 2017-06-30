import {Component, Input, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver, ComponentRef} from '@angular/core';
import * as component_type from '../../constants/component_type';

@Component({
  selector: 'list-item-component',
  template: `
    <div #itemContainer></div>
  `
})
export class ListItemComponent implements OnInit{
  @Input() item: any[];
  @Input() type: any;

  @ViewChild('itemContainer', {read: ViewContainerRef})
  itemContainer: ViewContainerRef;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  ngOnInit(): void {
    this.createItem(component_type.types[this.type], this.item);

  }

  createItem( component: any, attributes: any[]): void {

    const childComponent = this.componentFactoryResolver.resolveComponentFactory(component);
    let componentRef: ComponentRef<any> = this.itemContainer.createComponent(childComponent);

    attributes.forEach( (element, index) => {
      componentRef.instance[element['key']] = element['value'];
    });

  }

}
