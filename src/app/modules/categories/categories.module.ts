import { NgModule } from '@angular/core';

import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoriesTableComponent } from './components/categories-table/categories-table.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [CategoriesTableComponent],
  imports: [CategoriesRoutingModule, RouterModule],
})
export class CategoriesModule {}
