import { Component } from '@angular/core';
import { ButtonComponent } from './button/button.component';

@Component({
    selector: 'gallery-app',
    template: `
       <btn [name]="'Button'" 
            [label]="'Add'"
            [class]="'MyClass'"  
            [shape]="'tab'"
            [icon_align]="'left'"
            [icon]="'fa fa-plus'">
       </btn>
       <slider></slider>
    `
})
export class AppComponent {
}
