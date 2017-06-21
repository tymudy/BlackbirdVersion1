import { Component, Input } from '@angular/core';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'list-item-component',
  template: `
    <div *templateRenderer="500 * item" class="item">
      {{item}}
    </div>
  `,
  styles: [`
    .item {
      padding: 2rem;
      font-size: 2rem;
      font-family: 'Helvetica', sans-serif;
      font-weight: 300;
      background: #e3f2fd;
      margin: 1rem;
      display: inline-block;
    }
  `]
})
export class ListItemComponent {
  @Input() item: any;
}
