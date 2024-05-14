import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ProxyInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.info('InterceptorOne is working');
    console.log(request.url);
    if (request.url.startsWith('/public')) {
      const newRequest = request.clone({
        url: request.url.replace(
          '/public',
          'http://localhost:3000/public'
        ),
      });

      return next.handle(newRequest);
    } else {
      return next.handle(request);
    }

  }
}
