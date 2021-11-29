import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddItemComponent } from './add-item/add-item.component';
import { DetailsItemComponent } from './details-item/details-item.component';
import { ListItemsComponent } from './list-items/list-items.component';
import { ModifyItemComponent } from './modify-item/modify-item.component';
import { DetailsItemResolver } from './resolvers/details-item.resolver';

const routes: Routes = [
  {  
    path: '',
    component: ListItemsComponent,
  },
  {  
    path: 'aggiungi-oggetto',
    component: AddItemComponent
  },
  {
    path: 'dettagli-oggetto/:id',
    component: DetailsItemComponent,
    resolve: {
      item : DetailsItemResolver,
    },
  },
  {
    path: 'modifica-oggetto/:id',
    component: ModifyItemComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ItemsRoutingModule {}
