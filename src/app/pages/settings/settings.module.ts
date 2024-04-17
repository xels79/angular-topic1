import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';
import { TabViewModule } from 'primeng/tabview';
import { ReactiveFormsModule } from '@angular/forms';
import { ChangePasswordComponent } from './change-password/change-password.component';

@NgModule({
  declarations: [
    SettingsComponent,
    ChangePasswordComponent
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    TabViewModule,
    ReactiveFormsModule
  ]
})
export class SettingsModule { }
