import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { IErrorMessage } from 'src/app/models/IErrorMessage';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ConfigService } from 'src/app/services/config-service/config-service.service';
import { UserService } from 'src/app/services/user/user.service';

interface IVisited{
  username?:boolean,
  password?:boolean,
  email?:boolean,
  pswdRepeat?:boolean
}
// type TRequiredKeyd = keyof IRequired;

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit, OnDestroy {

  logIn:string;
  pswd:string;
  pswdRepeat:string;
  cardNumber:string;
  email:string;
  storeUser:boolean;
  private errors:IErrorMessage[] = [];
  visited:IVisited={};
  useUserCard:boolean;
  uSRVSubscription: Subscription;
  authErrorSubscription: Subscription;
  uForm: FormGroup;

  constructor(
    private messageService: MessageService,
    private authService:AuthService,
    private userSevice:UserService,
    private router:Router
  ) {
    this.storeUser = true;
  }

  ngOnInit(): void {
    this.useUserCard = ConfigService.config.useUserCard;
    this.authErrorSubscription = this.authService.errorMsgObserv$.subscribe(data=>{
      data.forEach(errorItem=>{
        if (errorItem.fieldName){
          this.messageService.add({severity:'error', summary:`${this.errorTrnslate(errorItem.fieldName)}`, detail:errorItem.message});
        }else{
          this.messageService.add({severity:"error",summary:"Ошибка регистрации", detail:errorItem.message});
        }
      });
      this.errors = [...data];
    });
    this.uSRVSubscription = this.userSevice.userBehSubject$.subscribe(user=>{
      if (user!==null){
        this.router.navigate(['tickets/list']);
      }
    });
    this.uForm = new FormGroup({
      username: new FormControl('',{validators:Validators.required})
    });
  }

  ngOnDestroy(): void {
    this.authErrorSubscription.unsubscribe();
    this.uSRVSubscription.unsubscribe();
  }

  onSignUp(e:Event){
    console.log('try to signup');
    if (this.pswdRepeat !== this.pswd){
      this.errors.push({fieldName:"password", message:"Пароли не совпадают."});
      this.errors.push({fieldName:"pswdRepeat", message:"Пароли не совпадают."});
      this.messageService.add({severity:"error",summary:"Ошибка",detail:"Пароли не савподают."});
    }else{
      this.authService.signup(this.logIn,this.pswd, this.email ,this.cardNumber, this.storeUser)
    }
  }
  setVisited(name:keyof IVisited):void{
    this.visited[name] = true;
  }

  errorTrnslate(key:string): string{
    const val = [
      {_key:'username', t:'Имя пользователя'},
      {_key:'password', t:'Пароль'},
      {_key:'pswdRepeat', t:'Павторить пароль'},
      {_key:'email', t:'Почта'}
    ].find(it=>it._key == key);
    if (val){
      return `Поле "${val.t}"`;
    }else{
      return `Поле "${key}"`;
    }
  }
  hasError(name:string):boolean{
    if (this.errors.find(item=>item.fieldName === name)){
      return true;
    }
    return false;
  }
}
