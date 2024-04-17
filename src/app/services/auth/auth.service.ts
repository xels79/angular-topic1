import { Injectable } from '@angular/core';
import { IUser } from 'src/app/models/IUser';
import { UserService } from '../user/user.service';
import { IErrorMessage } from 'src/app/models/IErrorMessage';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private errors:IErrorMessage[] = [];
  constructor(private userService:UserService) { }
  private set usersStorage(val:IUser[]){
    window.localStorage.setItem('ang_schk_users_store', JSON.stringify(val));
  }
  private get usersStorage():IUser[]{
    const tmp:string|null = window.localStorage.getItem('ang_schk_users_store');
    if (tmp){
      return JSON.parse(tmp);
    }else{
      return [];
    }
  }

  private proccedAuth(_user:IUser, token:string, storeUser?:boolean){
    this.errors = [];
    this.userService.setUser(_user, storeUser);
    this.userService.setToken( token, storeUser);
  }
  login(uname:string,pswd:string, storeUser?:boolean):boolean{
    const userExist:IUser|undefined = this.usersStorage.find(user=>user.username === uname);
    this.logout();
    if (userExist){
      if (userExist.pswd === pswd){
        this.proccedAuth(userExist, 'user-private-token', storeUser);
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
  logout(){
    this.userService.setUser(null);
    this.userService.setToken('', true);
  }
  signup(uname:string,pswd:string,email:string, cardNumber?:string, storeUser?:boolean):boolean{
    const userExist:IUser|undefined = this.usersStorage.find(user=>user.username === uname);
    this.logout();
    if (!userExist){
      const user:IUser={
          username:uname,
          pswd:pswd,
          cardNumber:cardNumber,
          email:email
      }
      if (!email){
        this.errors.push({fieldName:'email', message:'Необходимо указать почту'});
      }else if (!/^[^.][A-Z0-9._%+-]+@[A-Z0-9-]+\.{1}[A-Z]{2,4}$/i.test(email)){
        this.errors.push({fieldName:'email', message:'Формат поля "Почта" должен соответствовать email адресу'});
      }
      if (pswd.length<8){
        this.errors.push({fieldName:'pswd', message:'Поле "Пароль" должно содержать не менее 8-ми символов!'});
      }
      if (this.errors.length){
        return false;
      }
      const _uStoreg = this.usersStorage;
      _uStoreg.push(user);
      this.usersStorage = _uStoreg;
      this.proccedAuth(user, 'user-private-token', storeUser);
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
  getLastError():IErrorMessage|undefined{
    return this.errors.pop();
  }
  getErrors():IErrorMessage[]{
    const retValue = [... this.errors];
    this.errors = [];
    return retValue;
  }
  get isAuthorized():boolean{
    return this.userService.getUser()!==null;
  }
  updateUser(nUser: IUser):void{
    const uStorage = this.usersStorage;
    const uStorageIndex = uStorage.findIndex( item => item.username === nUser.username);
    if (uStorageIndex>-1){
      uStorage[uStorageIndex] = nUser;
      this.usersStorage = uStorage;
    }
  }
}
