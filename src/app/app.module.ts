import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy, RouterModule} from '@angular/router';
import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {ROUTES} from './route/routes';

import {BusyModule} from 'angular2-busy';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {VirtualScrollModule} from './virtual-scroll';

import { AppComponent } from './app.component';
import { SongsComponent } from './songs/songs.component';
import { ButtonComponent } from './button/button.component';
import {ListSongComponent} from './songs/list-song.component';
import {ListComponent} from './list/list.component';
import {ListItemComponent} from './list/list-item.component';
import {SliderComponent} from './slider/slider.component';
import {GalleryComponent} from './gallery/gallery.component';
import {GalleryButtonComponent} from './gallery/gallery-button/gallery-button.component';
import {GalleryListComponent} from './gallery/gallery-list/gallery-list.component';
import {GallerySliderComponent} from './gallery/gallery-slider/gallery-slider.component';
import {GallerySpecComponent} from './gallery/gallery-spec/spec-list.component';

import { AngularFontAwesomeModule } from 'angular-font-awesome/angular-font-awesome';


import { enableProdMode } from '@angular/core';
enableProdMode();

import {VideoComponent} from './video/video.component';
import {WindowRefService} from './video/WindowRefService';
import {ShareService} from './share/shareService';

@NgModule({
  declarations: [
    AppComponent,
    SongsComponent,
    SongsComponent,
    ButtonComponent,
    SliderComponent,
    ListSongComponent,
    ListComponent,
    ListItemComponent,
    GalleryComponent,
    GalleryButtonComponent,
    GalleryListComponent,
    GallerySliderComponent,
    ListSongComponent,
    GallerySpecComponent,
    VideoComponent
  ],
  imports: [
    AngularFontAwesomeModule,
    BrowserModule,
    BusyModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    VirtualScrollModule,
    RouterModule.forRoot(ROUTES, { useHash: true})
  ],
  providers: [WindowRefService, ShareService],
  entryComponents: [ButtonComponent, SliderComponent],
  schemas: [ NO_ERRORS_SCHEMA ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
