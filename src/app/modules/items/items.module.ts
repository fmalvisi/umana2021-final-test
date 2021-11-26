import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


import { ItemsRoutingModule } from './items-routing.module';
import { ListItemsComponent } from './list-items/list-items.component'; 
import { AddItemComponent } from './add-item/add-item.component';
import { DetailsItemComponent } from './details-item/details-item.component';
import { ModifyItemComponent } from './modify-item/modify-item.component';
import { CurrencyEurPipe } from './../../shared/pipes/currency.pipe';




@NgModule({
  declarations: [
    ListItemsComponent, 
    AddItemComponent,
    DetailsItemComponent,
    ModifyItemComponent,
    CurrencyEurPipe
  ],
  imports: [
    CommonModule,
    ItemsRoutingModule,
    FormsModule
  ]
})
export class ItemsModule { }
