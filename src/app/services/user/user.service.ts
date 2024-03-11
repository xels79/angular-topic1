import { Injectable } from '@angular/core';
import { IUser } from 'src/app/models/IUser';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user:IUser|null;
  constructor() { }
  setUser(user:IUser|null, storeUser?:boolean):void{
    this.user = user;
    if (storeUser && user){
      window.localStorage.setItem('ang_schk_user_store', JSON.stringify(user));
    }else{
      window.localStorage.removeItem('ang_schk_user_store');
    }
  }
  getUser():IUser|null{
    if (!this.user){
      const findedUser:string|null = window.localStorage.getItem('ang_schk_user_store');
      if (findedUser){
        this.user = JSON.parse(findedUser);
        return this.user;
      }else{
        return null;
      }
    }else{
      return this.user;
    }
  }
  get username():string{
    const user = this.getUser();
    if (user){
      return user.username;
    }else{
      return '';
    }
  }
}
