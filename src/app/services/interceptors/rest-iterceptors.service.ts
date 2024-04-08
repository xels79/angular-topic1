import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserService } from '../user/user.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestIterceptorsService implements HttpInterceptor {

  constructor(private userService:UserService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.userService.getToken();
    if (token){
      return next.handle(req.clone({
        headers: req.headers.set("Autorization", `Bearer ${token}`)
      }))
    }else{
      return next.handle(req);
    }
  }
}
