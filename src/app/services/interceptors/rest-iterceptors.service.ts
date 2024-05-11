import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserService } from '../user/user.service';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RestIterceptorsService implements HttpInterceptor {

  constructor(
    private userService:UserService,
    private router:Router,
    private messageService: MessageService,
    private authService: AuthService
  ) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.userService.getToken();
    let newReq;
    //const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJpYXQiOjE3MTUwOTk5OTksImV4cCI6MTcxNTEwMzU5OX0.CKbFAP9IA640ajtTvdM2te5JHpfu9dy-N7_YnDaIEfU';
    if (token){
      newReq = req.clone({
        headers: req.headers.set("Authorization", `Bearer ${token}`)
      });
    }else{
      newReq = req;
    }
    return next.handle(newReq).pipe(
        tap({
          error: (event)=>{
            if (this.router.routerState.snapshot.url !== '/auth' && event.status === 401){
              console.log('intercepter error:',event);
              console.log(this.router.routerState.snapshot.url)
              this.messageService.add({severity:'error', summary:'Ошибка!', detail:'Требуется авторизация'});
              this.authService.logout();
              this.router.navigate(['/auth']);
            }
          },
        })
      );
  }
}
