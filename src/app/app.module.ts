import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { LOCALE_ID } from '@angular/core';
import localeRu from '@angular/common/locales/ru';
import { registerLocaleData } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RestIterceptorsService } from './services/interceptors/rest-iterceptors.service';

registerLocaleData(localeRu, 'ru');

@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule

  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'ru' },
    { provide: HTTP_INTERCEPTORS, useClass: RestIterceptorsService, multi: true }
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
