import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CategoriesAddComponent } from './components/categories-add/categories-add.component';
import { CategoriesDetailComponent } from './components/categories-detail/categories-detail.component';
import { CategoriesEditComponent } from './components/categories-edit/categories-edit.component';
import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoriesTableComponent } from './components/categories-table/categories-table.component';

import { FormsModule } from '@angular/forms';
import { CategoryDataService } from './service/category-data.service';

@NgModule({
  declarations: [
    CategoriesAddComponent,
    CategoriesDetailComponent,
    CategoriesEditComponent,
    CategoriesTableComponent
  ],
  imports: [
    CategoriesRoutingModule,
    RouterModule,
    CommonModule,
    FormsModule
  ],
  providers: [CategoryDataService],
})
export class CategoriesModule {}
