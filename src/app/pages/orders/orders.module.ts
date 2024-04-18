import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TreeTableModule} from 'primeng/treetable';
import {CheckboxModule} from 'primeng/checkbox';

import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersComponent } from './orders.component';
import { OrdersHeaderComponent } from './orders-header/orders-header.component';


@NgModule({
  declarations: [
    OrdersComponent,
    OrdersHeaderComponent
  ],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    TreeTableModule,
    CheckboxModule
  ]
})
export class OrdersModule { }
