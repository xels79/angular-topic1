import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthorizationComponent } from './authorization/authorization.component';
import { TabViewModule } from 'primeng/tabview';
import { AuthComponent } from './auth.component'
import { InputTextModule} from 'primeng/inputtext';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { CheckboxModule } from 'primeng/checkbox';
import { RegistrationComponent } from './registration/registration.component';
import { ProgressBarModule } from 'primeng/progressbar';
// import { ToastModule } from 'primeng/toast';
// import { MessageService } from 'primeng/api';

@NgModule({
  declarations: [
    AuthorizationComponent,
    AuthComponent,
    RegistrationComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    TabViewModule,
    InputTextModule,
    FormsModule,
    CheckboxModule,
    ReactiveFormsModule,
    ProgressBarModule
  ],
  providers:[]
})
export class AuthModule { }
