import { Component } from '@angular/core';
import { ButtonComponent } from './button/button.component';

@Component({
    selector: 'gallery-app',
    template: `
       <btn [name]="'Button'" 
            [label]="'Add'"
            [class]="'MyClass'"  
            [shape]="'rounded-rectangle'"
            [icon]="'fa fa-plus'">
       </btn>
    `
})
export class AppComponent {
}
