import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './users-routing.module';
import { ShowUsersComponent } from './show-users/show-users.component';
import { AggiungiComponent } from './aggiungi/aggiungi.component';
import { ModificaComponent } from './modifica/modifica.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ShowUsersComponent,
    AggiungiComponent,
    ModificaComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    ReactiveFormsModule
  ],
  providers:[
    FormBuilder
  ]
})
export class UsersModule { }
