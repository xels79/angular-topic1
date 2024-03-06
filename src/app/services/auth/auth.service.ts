import { Injectable } from '@angular/core';
interface IUser{
  username:string,
  pswd:string,
  email:string,
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
  //private userStorage:IUser[]= [];
  private errors:IErrorMessage[] = [];
  private loggetUser:IUser|null = null;
  private user:IUser|null = null;
  constructor() { }
  private set userStorage(val:IUser[]){
    window.localStorage.setItem('ang_schk_user_store', JSON.stringify(val));
  }
  private get userStorage():IUser[]{
    const tmp:string|null = window.localStorage.getItem('ang_schk_user_store');
    if (tmp){
      return JSON.parse(tmp);
    }else{
      return [];
    }
  }
  login(uname:string,pswd:string):boolean{
    const userExist:IUser|undefined = this.userStorage.find(user=>user.username === uname);
    if (userExist){
      if (userExist.pswd === pswd){
        this.errors = [];
        this.loggetUser = userExist;
        return true;
      }else{
        this.errors.push({fieldName:'username', message:'Неверное имя пользователя или пароль.'});
        return false;
      }
    }else{
      this.errors.push({fieldName:'username', message:'Неверное имя пользователя или пароль.'});
      return false;
    }
  }
  signup(uname:string,pswd:string,email:string, cardNumber:string|undefined):boolean{
    const userExist:IUser|undefined = this.userStorage.find(user=>user.username === uname);
    if (!userExist){
      const user:IUser={
          username:uname,
          pswd:pswd,
          cardNumber:cardNumber,
          email:email
      }
      if (!email){
        this.errors.push({fieldName:'email', message:'Неоюходимо указать почту'});
        return false;  
      }
      if (!/^[^.][A-Z0-9._%+-]+@[A-Z0-9-]+\.{1}[A-Z]{2,4}$/i.test(email)){
        this.errors.push({fieldName:'email', message:'Формат поля "Почта" должен соответствовать email адресу'});
        return false;  
      }
      if (pswd.length<8){
        this.errors.push({fieldName:'pswd', message:'Поле "Пароль" должно содержать не менее 8-ми символов!'});
        return false;  
      }
      const _uStoreg = this.userStorage;
      _uStoreg.push(user);
      this.userStorage = _uStoreg;
      this.errors = [];
      this.loggetUser = user;
      return true;
    }else{
      this.errors.push({fieldName:'username', message:'Имя пользователя уже существует.'});
      return false;
    }
  }
  getLastErrorText():string{
    if (this.errors.length){
      const error:IErrorMessage = this.errors.pop() as IErrorMessage;
      return error.message;
    }else{
      return '';
    }
  }
}
