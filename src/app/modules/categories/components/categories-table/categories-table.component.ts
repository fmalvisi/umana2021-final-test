import { Component, OnInit } from '@angular/core';
import { CategoryService, ItemsService } from 'src/app/core/api/generated';

import { Category } from 'src/app/core/api/generated';

@Component({
  selector: 'app-categories-table',
  templateUrl: './categories-table.component.html',
  styleUrls: ['./categories-table.component.scss'],
})
export class CategoriesTableComponent implements OnInit {
/*   name = '';
  description = '';
  items = '';*/

  currentItem: string | null = '';
  hideShow = false;

  constructor(
    private categoryService: CategoryService,
    private itemService: ItemsService,
  ) {}

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(categories => {
      /* for (const item of cats) {
        this.name = item.name;
        this.description = item.description;
      } */
      this.categoryArr = categories;
      console.log('assigned categories: ', this.categoryArr);
    });




    /* this.itemService.getItems().subscribe(items => {
      for (const item of items) {
        console.log(item.name);
        this.items += item.name;
        // this.currentItem = item.id;
      }
    }); */
  }

  hide(): boolean {
    console.log(this.hideShow);
    return (this.hideShow = !this.hideShow);
  }
}
