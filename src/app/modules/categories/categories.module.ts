import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoriesTableComponent } from './components/categories-table/categories-table.component';
import { CategoriesDetailComponent } from './components/categories-detail/categories-detail.component';
import { CategoriesAddComponent } from './components/categories-add/categories-add.component';

@NgModule({
  declarations: [
    CategoriesTableComponent,
    CategoriesDetailComponent,
    CategoriesAddComponent
  ],
  imports: [CommonModule, CategoriesRoutingModule],
})
export class CategoriesModule {}
