import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { Interceptor } from './interceptor/interceptor';
import { routes } from './app.routes';
import { NgxEditorModule } from 'ngx-editor';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { APISERVICE } from './services/auth.service';
import { provideHttpClient,withInterceptors } from '@angular/common/http';
import { NgxSpinnerModule } from "ngx-spinner";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { MtxDatetimepickerModule } from '@ng-matero/extensions/datetimepicker';
import { MatInputModule } from '@angular/material/input';
import { MtxNativeDatetimeModule } from '@ng-matero/extensions/core';

export const appConfig: ApplicationConfig = {
    providers: [ { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: true } } ,
        importProvidersFrom(MatInputModule, MtxDatetimepickerModule,MtxNativeDatetimeModule),
        provideZoneChangeDetection({ eventCoalescing: true }),APISERVICE,NgxSpinnerModule,
         provideHttpClient(withInterceptors([Interceptor])), provideRouter(routes), provideClientHydration(), provideAnimationsAsync(), provideAnimationsAsync(),BrowserAnimationsModule],

};
