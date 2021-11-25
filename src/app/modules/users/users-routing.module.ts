import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AggiungiComponent } from './aggiungi/aggiungi.component';
import { ModificaComponent } from './modifica/modifica.component';
import { ShowUsersComponent } from './show-users/show-users.component';

const routes: Routes = [
  {
    path:"",
    component:ShowUsersComponent
  },
  {
    path:"aggiungi",
    component:AggiungiComponent
  },
  {
    path:"modifica/:id",
    component:ModificaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
