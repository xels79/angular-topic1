import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth/auth.service';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  logIn:string;
  pswd:string;
  pswdRepeat:string;
  cardNumber:string;
  email:string;
  
  constructor(
    private messageService: MessageService,
    private authService:AuthService,
  ) { }

  ngOnInit(): void {
  }

  onSignUp(e:Event){
    console.log('try to signup');
    if (this.pswdRepeat !== this.pswd){
      this.messageService.add({severity:"error",summary:"Ошибка",detail:"Пароли не савподают."});
    }else{
      if (!this.authService.signup(this.logIn,this.pswd, this.email ,this.cardNumber)){
        this.messageService.add({severity:"error",summary:"Ошибка регистрации", detail:this.authService.getLastErrorText()});
      }else{
        this.messageService.add({severity:"success",summary:"Сообщение", detail:"Пользователь успешно зарегестрировался!"});
      }
    }
  }

}
