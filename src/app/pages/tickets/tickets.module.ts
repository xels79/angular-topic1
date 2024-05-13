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
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { VisualSearchComponent } from './ticket-list/visual-search/visual-search.component';
import { ProgressBarModule } from 'primeng/progressbar';
import { BlocksStyleDirective } from 'src/app/directive/blocks-style.directive';
import { CalendarModule } from 'primeng/calendar';
import { NotFoundRoutingModule } from '../not-found/not-found-routing.module';
// import { ToastModule } from 'primeng/toast';
// import { MessageService } from 'primeng/api';

@NgModule({
  declarations: [
    TicketsComponent,
    HeaderComponent,
    FooterComponent,
    TicketListComponent,
    AsideComponent,
    VisualSearchComponent,
    BlocksStyleDirective
  ],
  imports: [
    CommonModule,
    TicketsRoutingModule,
    MenubarModule,
    ChipModule,
    DropdownModule,
    FormsModule,
    ProgressBarModule,
    CalendarModule
  ],
  providers:[]
})
export class TicketsModule { }
