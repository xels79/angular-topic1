import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthorizationComponent } from './authorization/authorization.component';
import { TabViewModule } from 'primeng/tabview';
import { AuthComponent } from './auth.component'
import { InputTextModule} from 'primeng/inputtext';
import {FormsModule} from "@angular/forms";
import { CheckboxModule } from 'primeng/checkbox';

@NgModule({
  declarations: [
    AuthorizationComponent,
    AuthComponent,

  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    TabViewModule,
    InputTextModule,
    FormsModule,
    CheckboxModule
  ]
})
export class AuthModule { }
