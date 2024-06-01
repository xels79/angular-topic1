import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './components/settings.component';
import { TabViewModule } from 'primeng/tabview';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { StatisticComponent } from './components/statistic/statistic.component';
import { TableModule } from 'primeng/table';
import { ProgressBarModule } from 'primeng/progressbar';
import { UsersComponent } from './components/users/users.component';
import { InputTextModule } from 'primeng/inputtext';
import { FilterPipe } from './pipes/filter.pipe';
import { TourLoaderComponent } from './components/tour-loader/tour-loader.component';
import { DropdownModule } from 'primeng/dropdown';

@NgModule({
  declarations: [
    SettingsComponent,
    ChangePasswordComponent,
    StatisticComponent,
    UsersComponent,
    FilterPipe,
    TourLoaderComponent
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    TabViewModule,
    ReactiveFormsModule,
    TableModule,
    ProgressBarModule,
    InputTextModule,
    FormsModule,
    DropdownModule
  ]
})
export class SettingsModule { }
