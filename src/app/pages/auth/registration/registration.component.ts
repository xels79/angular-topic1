import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth/auth.service';
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

  constructor(
    private messageService: MessageService,
    private authService:AuthService,
    private router:Router
  ) {
    this.storeUser = true;
   }

  ngOnInit(): void {
  }

  onSignUp(e:Event){
    console.log('try to signup');
    if (this.pswdRepeat !== this.pswd){
      this.messageService.add({severity:"error",summary:"Ошибка",detail:"Пароли не савподают."});
    }else{
      if (!this.authService.signup(this.logIn,this.pswd, this.email ,this.cardNumber, this.storeUser)){
        this.messageService.add({severity:"error",summary:"Ошибка регистрации", detail:this.authService.getLastErrorText()});
      }else{
        this.router.navigate(['tickets/list']);
      }
    }
  }

}
