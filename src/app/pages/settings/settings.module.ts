import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';
import { TabViewModule } from 'primeng/tabview';
import { ReactiveFormsModule } from '@angular/forms';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { StatisticComponent } from './statistic/statistic.component';
import { TableModule } from 'primeng/table';
import { ProgressBarModule } from 'primeng/progressbar';

@NgModule({
  declarations: [
    SettingsComponent,
    ChangePasswordComponent,
    StatisticComponent
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    TabViewModule,
    ReactiveFormsModule,
    TableModule,
    ProgressBarModule
  ]
})
export class SettingsModule { }
