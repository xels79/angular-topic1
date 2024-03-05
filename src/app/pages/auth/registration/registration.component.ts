import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
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
  
  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
  }

  onSignUp(e:Event){
    console.log('try to signup');
    if (this.pswdRepeat !== this.pswd){
      this.messageService.add({severity:"error",summary:"Ошибка",detail:"Пароли не савподают."});
    }
  }

}
