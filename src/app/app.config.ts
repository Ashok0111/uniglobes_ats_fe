import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { Interceptor } from './interceptor/interceptor';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { APISERVICE } from './services/auth.service';
import { provideHttpClient,withInterceptors } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
    providers: [provideZoneChangeDetection({ eventCoalescing: true }),APISERVICE, provideHttpClient(withInterceptors([Interceptor])), provideRouter(routes), provideClientHydration(), provideAnimationsAsync(), provideAnimationsAsync()]
};
