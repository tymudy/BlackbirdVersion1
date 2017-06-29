import { GalleryComponent } from '../gallery/gallery.component';
import { GalleryButtonComponent } from '../gallery/gallery-button/gallery-button.component';
import { GalleryListComponent } from '../gallery/gallery-list/gallery-list.component';
import { GallerySliderComponent } from '../gallery/gallery-slider/gallery-slider.component';
import { VideoComponent } from '../../../crestron-sdk/components/video/video.component';
import { GallerySpecComponent } from '../gallery/gallery-spec/spec-list.component';

export const ROUTES = [
  {
    path: '',
    redirectTo: 'gallery',
    pathMatch: 'full'
  },
  {
    path: 'gallery',
    component: GalleryComponent,
    children: [
      { path: '', redirectTo: 'button', pathMatch: 'full' },
      { path: 'button', component: GalleryButtonComponent },
      { path: 'list', component: GalleryListComponent },
      { path: 'slider', component: GallerySliderComponent },
      { path: 'spec', component: GallerySpecComponent},
      { path: 'video', component: VideoComponent }
    ]
  }
];
