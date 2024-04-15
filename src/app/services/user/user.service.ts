import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IUser } from 'src/app/models/IUser';

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnInit {
  private user:IUser|null;
  private token:string;
  private userBehSubject = new BehaviorSubject<IUser | null>(null);
  readonly userBehSubject$ = this.userBehSubject.asObservable();
  constructor() { }
  ngOnInit(): void {
    this.user=null;
    this.token = '';
  }
  setUser(user:IUser|null, storeUser?:boolean):void{
    this.user = user;
    this.userBehSubject.next(user);
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
        this.userBehSubject.next(this.user);
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
  getToken():string{
    if (!this.token){
      const value:string|null = window.localStorage.getItem('ang_schk_u_token');
      if (value){
        this.token = value;
      }else{
        this.token = '';
      }
    }
    return this.token;
  }
  setToken(value:string, storeToken?:boolean): void{
    this.token = value;
    if (this.token && storeToken){
      window.localStorage.setItem('ang_schk_u_token', this.token);
    }else if (!this.token){
      window.localStorage.removeItem('ang_schk_u_token');
    }
  }
}
