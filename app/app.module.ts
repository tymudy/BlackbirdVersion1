import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import { ButtonComponent } from './button/button.component';

@NgModule({
  imports: [ BrowserModule ],
  declarations: [ 
    AppComponent,
    ButtonComponent
   ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
