import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CategoriesAddComponent } from './components/categories-add/categories-add.component';
import { CategoriesDetailComponent } from './components/categories-detail/categories-detail.component';
import { CategoriesTableComponent } from './components/categories-table/categories-table.component';

const routes: Routes = [
  {
    path: '',
    component: CategoriesTableComponent,
    children: [
      { path: 'detail', component: CategoriesDetailComponent },
      { path: 'add', component: CategoriesAddComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoriesRoutingModule {}
