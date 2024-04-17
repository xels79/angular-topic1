import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { IUser } from 'src/app/models/IUser';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  uForm: FormGroup;
  constructor(
    private user:UserService,
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    this.uForm = new FormGroup({
      oldPassword: new FormControl('',{ validators:Validators.required }),
      newPassword: new FormControl('', [ Validators.required, Validators.minLength(8) ]),
      confirmPassword: new FormControl('', [ Validators.required, (control: AbstractControl): ValidationErrors | null => {
        if (this.uForm){
          const nVal = (this.uForm.get('newPassword') as FormControl).value;
          const isError = control.value !== nVal;
          console.log("proceed validator", control.value, isError, nVal);
          return isError ? { passDoesNotMatch: { value: control.value } } : null;
        }else{
          return null;
        }
      }])
    });
  }

  get oldPassword():FormControl{
    return this.uForm.get('oldPassword') as FormControl;
  }
  get newPassword():FormControl{
    return this.uForm.get('newPassword') as FormControl;
  }
  get confirmPassword():FormControl{
    return this.uForm.get('confirmPassword') as FormControl;
  }

  saveClick():void{
    console.log('Save click');
    if (this.user.getUser()?.pswd!==this.oldPassword.value){
      this.oldPassword.setErrors({
        wrongPassword:{ value: this.oldPassword.value }
      });
    }else{
      const user:IUser | null = this.user.getUser();
      if (user){
        user.pswd = this.newPassword.value;
        this.authService.updateUser( user );
        console.log('updateUser', user);
        this.messageService.add({severity:"info",summary:'Успех.', detail:`Пароль пользователя "${user.username}" успешно изменён.`});
        this.authService.logout();
        setTimeout(()=>{
          this.router.navigate(['/auth']);
          this.messageService.add({severity:"error",summary:'Внимание!', detail:'Требуется повторная авторизация!'});
        },1000);
      }
    }
  }

}
