import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { IErrorMessage } from 'src/app/models/IErrorMessage';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ConfigService } from 'src/app/services/config-service/config-service.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss']
})

export class AuthorizationComponent implements OnInit, OnDestroy {
  logIn: string ;
  pswd:string;
  checkedVIP:boolean;
  vipCardNumber:string;
  bootonPrompt:string;
  userHasEnter:boolean;
  pswdHasEnter:boolean;
  storeUser:boolean;
  useUserCard:boolean;
  errorText:string;
  uSRVSubscription: Subscription;
  authErrorSubscription: Subscription;
  showLoading = false;

  constructor(
    private authService:AuthService,
    private messageService: MessageService,
    private userService: UserService,
    private router:Router
  ) {
    this.storeUser = true;
  }

  ngOnInit(): void {
    this.useUserCard = ConfigService.config.useUserCard;
    this.checkedVIP=false;
    this.bootonPrompt = 'Войти'
    this.errorText = '';
    this.authErrorSubscription = this.authService.errorMsgObserv$.subscribe(data=>{
      this.showLoading = false;
      data.forEach(errorItem=>{
        if (errorItem.fieldName){
          this.messageService.add({severity:'error', summary:`${this.errorTrnslate(errorItem.fieldName)}`, detail:errorItem.message});
        }else{
          this.messageService.add({severity:"error",summary:"Ошибка авторизации", detail:errorItem.message});
        }
      });
      this.errorText = data[0].message;
    });
    this.uSRVSubscription = this.userService.userBehSubject$.subscribe(user=>{
      if (user!==null){
        this.router.navigate(['tickets/list']);
      }
    });

  }
  ngOnDestroy(): void {
    this.uSRVSubscription.unsubscribe();
    this.authErrorSubscription.unsubscribe();
  }
  onUHasEnter(){
    this.userHasEnter = true;
  }
  onPswdEnter(){
    this.pswdHasEnter = true;
  }
  cChange():void{
    this.errorText = "";
  }
  onLogin(){
    this.showLoading = true;
    this.authService.login(this.logIn, this.pswd, true);
  }
  errorTrnslate(key:string): string{
    const val = [
      {_key:'username', t:'Имя пользователя'},
      {_key:'password', t:'Пароль'},
    ].find(it=>it._key == key);
    if (val){
      return `Поле "${val.t}"`;
    }else{
      return `Поле "${key}"`;
    }
  }

}
