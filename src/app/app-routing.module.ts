import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TicketsRoutingModule} from "./pages/tickets/tickets-routing.module";
import { MainGaurdGuard } from './services/main-gaurd/main-gaurd.guard';



const routes: Routes = [
  {
    path: 'auth',
    loadChildren: ()  => import('./pages/auth/auth.module').then(m => m.AuthModule)
  },

  {
    path: 'tickets',
    loadChildren: () => import("./pages/tickets/tickets.module").then(m=>m.TicketsModule),
    canLoad:[MainGaurdGuard],
    canActivate:[MainGaurdGuard]
  },
  { path: '**',
    redirectTo: 'auth'
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
