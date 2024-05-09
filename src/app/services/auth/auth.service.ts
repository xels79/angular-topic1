import { Injectable } from '@angular/core';
import { ILSUser, IUser } from 'src/app/models/IUser';
import { UserService } from '../user/user.service';
import { IErrorMessage } from 'src/app/models/IErrorMessage';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { ConfigService } from '../config-service/config-service.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private errors:IErrorMessage[] = [];
  errorMsgObserv: Subject<IErrorMessage[]> = new Subject();
  readonly errorMsgObserv$=this.errorMsgObserv.asObservable();

  constructor(private userService:UserService, private http: HttpClient) { }

  private proccedAuth(_user:IUser, token:string, storeUser?:boolean){
    this.errors = [];
    console.log('proceedAuth', _user, token, storeUser);
    this.userService.setUser(_user, storeUser);
    this.userService.setToken( token, storeUser);
  }
  login(uname:string,pswd:string, storeUser?:boolean){
    this.logout();
    this.http.post<ILSUser>(ConfigService.createURL(`users/${uname}`), {username:uname, pswd}).subscribe(data=>{
      if( data!==null && typeof(data)==='object'){
        this.proccedAuth(data.user, data.access_token, storeUser);
      }
    }, response=>{
      if (Array.isArray(response.error)){
        this.errorMsgObserv.next(response.error)
      }else{
        console.error(response);
      }
    });
  }
  logout(){
    this.userService.setUser(null);
    this.userService.setToken('', true);
  }
  signup(uname:string,realname:string,pswd:string,email:string, cardNumber?:string, storeUser?:boolean){
    const _errors:IErrorMessage[] = [];
    if (!email){
      _errors.push({fieldName:'email', message:'Необходимо указать почту.'});
    }
    if (!realname){
      _errors.push({fieldName:'email', message:'Необходимо настоящее имя.'});
    }
    if (!/^[^.][A-Z0-9._%+-]+@[A-Z0-9-]+\.{1}[A-Z]{2,4}$/i.test(email)){
      _errors.push({fieldName:'email', message:'Формат поля "Почта" должен соответствовать email адресу.'});
    }
    if (pswd.length<8){
      _errors.push({fieldName:'password', message:'Поле "Пароль" должно содержать не менее 8-ми символов!'});
    }
    if (_errors.length){
      this.errorMsgObserv.next(_errors);
    }else{
      const user:IUser={
        username:uname,
        realname:realname,
        pswd:pswd,
        cardNumber:cardNumber,
        email:email
      };
      this.http.post<ILSUser>(ConfigService.createURL('users'), user).subscribe((data)=>{
        if( data!==null && typeof(data)==='object'){
          this.proccedAuth(data.user, data.access_token, storeUser);
        }
      }, response=>{
        if (Array.isArray(response.error)){
          console.error(response.error);
          this.errorMsgObserv.next(response.error)
        }else{
          console.error(response);
        }
      });
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
    // const uStorage = this.usersStorage;
    // const uStorageIndex = uStorage.findIndex( item => item.username === nUser.username);
    // if (uStorageIndex>-1){
    //   uStorage[uStorageIndex] = nUser;
    //   this.usersStorage = uStorage;
    // }
  }
}
