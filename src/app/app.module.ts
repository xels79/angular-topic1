import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { LOCALE_ID } from '@angular/core';
import localeRu from '@angular/common/locales/ru';
import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

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
    { provide: LOCALE_ID, useValue: 'ru' }
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
