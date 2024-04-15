import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { IErrorMessage } from 'src/app/models/IErrorMessage';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ConfigService } from 'src/app/services/config-service/config-service.service';

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
export class RegistrationComponent implements OnInit {

  logIn:string;
  pswd:string;
  pswdRepeat:string;
  cardNumber:string;
  email:string;
  storeUser:boolean;
  private errors:IErrorMessage[] = [];
  visited:IVisited={};
  useUserCard:boolean;

  constructor(
    private messageService: MessageService,
    private authService:AuthService,
    private router:Router
  ) {
    this.storeUser = true;
  }

  ngOnInit(): void {
    this.useUserCard = ConfigService.config.useUserCard;
  }

  onSignUp(e:Event){
    console.log('try to signup');
    if (this.pswdRepeat !== this.pswd){
      this.errors.push({fieldName:"password", message:"Пароли не савподают."});
      this.errors.push({fieldName:"pswdRepeat", message:"Пароли не савподают."});
      this.messageService.add({severity:"error",summary:"Ошибка",detail:"Пароли не савподают."});
    }else{
      if (!this.authService.signup(this.logIn,this.pswd, this.email ,this.cardNumber, this.storeUser)){
        this.errors = this.authService.getErrors() || [];
        this.errors.forEach(item=>{
          if (item){
            this.messageService.add({severity:"error",summary:"Ошибка регистрации", detail:item.message});
          }
        });
      }else{
        this.router.navigate(['tickets/list']);
      }
    }
  }
  setVisited(name:keyof IVisited):void{
    this.visited[name] = true;
  }
  hasError(name:string):boolean{
    if (this.errors.find(item=>item.fieldName === name)){
      return true;
    }
    return false;
  }
}
