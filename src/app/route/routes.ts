import { GalleryComponent } from '../gallery/gallery.component';
import { GalleryButtonComponent } from '../gallery/gallery-button/gallery-button.component';
import { GalleryListComponent } from '../gallery/gallery-list/gallery-list.component';
import { GallerySliderComponent } from '../gallery/gallery-slider/gallery-slider.component';
import { ButtonComponent } from '../button/button.component';

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
      { path: 'slider', component: GallerySliderComponent }
    ]
  }

];
