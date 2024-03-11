import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TicketsRoutingModule } from './tickets-routing.module';
import { TicketsComponent } from './tickets.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { TicketListComponent } from './ticket-list/ticket-list.component';
import { AsideComponent } from './aside/aside.component';
import { MenubarModule } from 'primeng/menubar';
import { ChipModule } from 'primeng/chip';

@NgModule({
  declarations: [
    TicketsComponent,
    HeaderComponent,
    FooterComponent,
    TicketListComponent,
    AsideComponent
  ],
  imports: [
    CommonModule,
    TicketsRoutingModule,
    MenubarModule,
    ChipModule,
  ],
})
export class TicketsModule { }
