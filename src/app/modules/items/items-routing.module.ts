import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddItemComponent } from './add-item/add-item.component';
import { DetailsItemComponent } from './details-item/details-item.component';
import { ListItemsComponent } from './list-items/list-items.component';
import { ModifyItemComponent } from './modify-item/modify-item.component';

const routes: Routes = [
  {
    path: '',
    component: ListItemsComponent,
    children: [
      {
        path: 'aggiungi-oggetto',
        component: AddItemComponent
      },
      {
        path: 'dettagli-oggetto',
        component: DetailsItemComponent
      },
      {
        path: 'modifica-oggetto/:id',
        component: ModifyItemComponent
      }
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ItemsRoutingModule {}
