import {Injectable} from '@angular/core';

@Injectable()
export class WindowRefService {
  static get nativeWindow(): any {
    return getWindow();
  }
}

function getWindow(): any {
  return window;
}
