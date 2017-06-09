import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import { ButtonComponent } from './button/button.component';
import { SliderComponent } from './slider/slider.component';

@NgModule({
  imports: [ BrowserModule ],
  declarations: [ 
    AppComponent,
    ButtonComponent,
    SliderComponent
   ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
