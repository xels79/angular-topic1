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
    //const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJpYXQiOjE3MTUwOTk5OTksImV4cCI6MTcxNTEwMzU5OX0.CKbFAP9IA640ajtTvdM2te5JHpfu9dy-N7_YnDaIEfU';
    if (token){
      const newReq = next.handle(req.clone({
        headers: req.headers.set("Authorization", `Bearer ${token}`)
      }));
      return newReq;
    }else{
      return next.handle(req);
    }
  }
}
