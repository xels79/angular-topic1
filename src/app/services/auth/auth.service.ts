import { Injectable } from '@angular/core';
interface IUser{
  username:string,
  pswd:string,
  cardNumber?:string
}
interface IErrorMessage{
  fieldName:string,
  message:string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userStorage:IUser[]= [];
  private errors:IErrorMessage[] = [];
  private loggetUser:IUser|null = null;
  constructor() { }

  login(uname:string,pswd:string):boolean{
    const userExist:IUser|undefined = this.userStorage.find(user=>user.username === uname);
    if (userExist){
      if (userExist.pswd === pswd){
        this.errors = [];
        this.loggetUser = userExist;
        return true;
      }else{
        this.errors.push({fieldName:'username', message:'Неверное имя полюзователя или пароль.'});
        return false;
      }
    }else{
      this.errors.push({fieldName:'username', message:'Неверное имя полюзователя или пароль.'});
      return false;
    }
  }
  signup(uname:string,pswd:string, cardNumber:string|undefined):boolean{
    const userExist:IUser|undefined = this.userStorage.find(user=>user.username === uname);
    if (!userExist){
      const user:IUser={
          username:uname,
          pswd:pswd,
          cardNumber:cardNumber
      }
      this.userStorage.push(user);
      this.errors = [];
      this.loggetUser = user;
      return true;
    }else{
      this.errors.push({fieldName:'username', message:'Имя пользователя уже существует.'});
      return false;
    }
  }
}
