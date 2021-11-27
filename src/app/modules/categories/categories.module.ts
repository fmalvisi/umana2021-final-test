import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoriesTableComponent } from './components/categories-table/categories-table.component';
import { RouterModule } from '@angular/router';
import { CategoriesDetailComponent } from './components/categories-detail/categories-detail.component';
import { CategoriesEditComponent } from './components/categories-edit/categories-edit.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CategoriesTableComponent,
    CategoriesDetailComponent,
    CategoriesEditComponent,
  ],
  imports: [
    CategoriesRoutingModule,
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
  ],
  providers: [FormBuilder],
})
export class CategoriesModule {}
