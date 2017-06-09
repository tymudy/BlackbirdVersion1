import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {ROUTES} from './route/routes';

import {BusyModule} from 'angular2-busy';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {CustomRouteReuseStrategy} from './route-reuse.strategy';
import {VirtualScrollModule} from './virtual-scroll';

import { AppComponent } from './app.component';
import { SongsComponent } from './songs/songs.component';
import { ButtonComponent } from './button/button.component';
import { ListSongComponent } from './songs/list-song.component';
import { SliderComponent } from './slider/slider.component';
import { SliderRangeComponent } from './slider/slider-range.component';

import { AngularFontAwesomeModule } from 'angular-font-awesome/angular-font-awesome';

@NgModule({
  declarations: [
    AppComponent,
    SongsComponent,
    ButtonComponent,
    SliderComponent,
    ListSongComponent
  ],
  imports: [
    AngularFontAwesomeModule,
    BrowserModule,
    BusyModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    VirtualScrollModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [{
    provide: SliderRangeComponent,
    useClass: CustomRouteReuseStrategy
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
