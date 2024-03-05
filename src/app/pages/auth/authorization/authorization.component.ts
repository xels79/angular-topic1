import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.css']
})

export class AuthorizationComponent implements OnInit {
  logIn: string ;
  pswd:string;
  checkedVIP:boolean;
  vipCardNumber:string;
  bootonPrompt:string;
  constructor(
    private authService:AuthService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.checkedVIP=false;
    this.bootonPrompt = 'Войти'
  }
  onLogin(){
    if (!this.authService.login(this.logIn,this.pswd)){
      this.messageService.add({severity:"error",summary:"Ошибка входа", detail:this.authService.getLastErrorText()});
    }
  }

}
