import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoriesTableComponent } from './components/categories-table/categories-table.component';
import { RouterModule } from '@angular/router';
import { CategoriesDetailComponent } from './components/categories-detail/categories-detail.component';

@NgModule({
  declarations: [CategoriesTableComponent, CategoriesDetailComponent],
  imports: [CategoriesRoutingModule, RouterModule, CommonModule],
})
export class CategoriesModule {}
