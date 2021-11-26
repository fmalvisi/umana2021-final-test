import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AggiungiComponent } from './aggiungi/aggiungi.component';
import { ModificaComponent } from './modifica/modifica.component';
import { UserResolverResolver } from './resolver/user-resolver.resolver';
import { ShowUsersComponent } from './show-users/show-users.component';
import { ResolverleoResolver } from './resolver/resolverleo.resolver';

const routes: Routes = [
  {
    path:"",
    component:ShowUsersComponent,
    resolve:{
      utente:ResolverleoResolver
    }
  },
  {
    path:"aggiungi",
    component:AggiungiComponent
  },
  {
    path:"modifica/:id",
    component:ModificaComponent,
    resolve:{
      utente:UserResolverResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
