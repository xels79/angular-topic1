import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TicketsComponent } from './tickets.component'
import { TicketListComponent } from './ticket-list/ticket-list.component';
const routes: Routes = [
  { path:'', component:TicketsComponent,
    children:[
        {
          path:'list',
          component:TicketListComponent
        },
        {
          path:'ticket/:id',
          loadChildren:()=>import('../ticket-info/ticket-info.module').then(m=>m.TicketInfoModule)
        },
        {
          path:'settings',
          loadChildren:()=>import('../settings/settings.module').then(m=>m.SettingsModule),
          data:{hideAsaid:true}
        },
        {
          path:'orders',
          loadChildren:()=>import('../orders/orders.module').then(m=>m.OrdersModule),
          data:{hideAsaid:true}
        },
        {
          path:'notfound',
          loadChildren: ()=>import('../not-found/not-found-routing.module').then(m=>m.NotFoundRoutingModule)
        }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketsRoutingModule { }
