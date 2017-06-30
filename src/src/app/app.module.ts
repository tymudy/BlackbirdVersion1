import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy, RouterModule} from '@angular/router';
import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {ROUTES} from './route/routes';

import {BusyModule} from 'angular2-busy';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';

import {GalleryComponent} from './gallery/gallery.component';
import {GalleryButtonComponent} from './gallery/gallery-button/gallery-button.component';
import {GalleryListComponent} from './gallery/gallery-list/gallery-list.component';
import {GallerySliderComponent} from './gallery/gallery-slider/gallery-slider.component';
import {GallerySpecComponent} from './gallery/gallery-spec/spec-list.component';


import { enableProdMode } from '@angular/core';
enableProdMode();

import { CrestronSdkModule } from '../../crestron-sdk/crestron-sdk.module';

@NgModule({
  declarations: [
    AppComponent,
    GalleryComponent,
    GalleryButtonComponent,
    GalleryListComponent,
    GallerySliderComponent,
    GallerySpecComponent,
  ],
  imports: [
    CrestronSdkModule,
    BrowserModule,
    BusyModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES, { useHash: true})
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
