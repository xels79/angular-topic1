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
    //const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJpYXQiOjE3MTQ5MzY0MzgsImV4cCI6MTcxNDkzNzAzOH0.exgip43w1jXsR_s_6y4OHdvNiRXVeLiS9LWbSo9TY6g";
    if (token){
      const newReq = next.handle(req.clone({
        headers: req.headers.set("Autorization", `Bearer ${token}`)
      }));
      return newReq;
    }else{
      return next.handle(req);
    }
  }
}
