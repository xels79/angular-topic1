import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { LOCALE_ID } from '@angular/core';
import localeRu from '@angular/common/locales/ru';
import { registerLocaleData } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RestIterceptorsService } from './services/interceptors/rest-iterceptors.service';
import { ConfigService } from './services/config-service/config-service.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

registerLocaleData(localeRu, 'ru');

@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ToastModule
  ],
  providers: [
    ConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [ConfigService], multi: true
    },
    { provide: LOCALE_ID, useValue: 'ru' },
    { provide: HTTP_INTERCEPTORS, useClass: RestIterceptorsService, multi: true },
    MessageService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }

function initializeApp(config: ConfigService) {
  return () => config.loadPromise().then(() => {
    console.log('---CONFIG LOADED--', ConfigService.config)
  });
}
