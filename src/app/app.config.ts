import { ApplicationConfig} from '@angular/core';
import { Router, provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { HttpClient, HttpClientModule, provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    HttpClient,
    provideAnimations(), 
    Router, 
    provideHttpClient()
  ]
};
