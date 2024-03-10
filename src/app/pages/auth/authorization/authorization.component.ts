import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  userHasEnter:boolean;
  pswdHasEnter:boolean;
  storeUser:boolean;
  constructor(
    private authService:AuthService,
    private messageService: MessageService,
    private router:Router
  ) {
    this.storeUser = true;
   }

  ngOnInit(): void {
    this.checkedVIP=false;
    this.bootonPrompt = 'Войти'
  }
  onUHasEnter(){
    this.userHasEnter = true;
  }
  onPswdEnter(){
    this.pswdHasEnter = true;
  }
  onLogin(){
    if (!this.authService.login(this.logIn,this.pswd, this.storeUser)){
      this.messageService.add({severity:"error",summary:"Ошибка входа", detail:this.authService.getLastErrorText()});
    }else{
      this.router.navigate(['tickets']);
      //this.messageService.add({severity:"success",summary:"Сообщение", detail:"Пользователь успешно вошел!"});
    }
  }

}
