import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppComponent} from "./app.component";



const routes: Routes = [
  {
    path: 'auth',
    loadChildren: ()  => import('./pages/auth/auth.module').then(m => m.AuthModule)
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
