import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideHttpClient } from '@angular/common/http';

import { provideToastr } from 'ngx-toastr'
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools'
import { userReducer } from './Store/User.Reducer';
import { UserEffect } from './Store/User.Effect';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),
  provideStore({ 'user': userReducer }),
  provideEffects([UserEffect]),
  provideHttpClient(), provideToastr(), provideAnimations(),
  provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })]
};
