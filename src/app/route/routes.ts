import { SongsComponent } from '../songs/songs.component';

export const ROUTES = [
  {
    path: '',
    redirectTo: 'page/1',
    pathMatch: 'full'
  },
  {
    path: 'page/:id',
    component: SongsComponent
  }
];
