import { Component, OnInit } from '@angular/core';
import { CategoryService, ItemsService } from 'src/app/core/api/generated';

import { Category, Item } from 'src/app/core/api/generated';

@Component({
  selector: 'app-categories-table',
  templateUrl: './categories-table.component.html',
  styleUrls: ['./categories-table.component.scss'],
})
export class CategoriesTableComponent implements OnInit {
/*   name = '';
  description = '';
  items = '';*/

 

  constructor(
    private categoryService: CategoryService,
    private itemService: ItemsService,
  ) {}

  currentItem: number | null = 0; 

  categoryArr: Category[] = [];

  itemArr: Item[] = [];

  sortCategories(){

    let containerArr = [];

    for(let category of this.categoryArr){
      let categoryItems = {
        name: category.name,
        items: []
      };
     /*  for(let item of this.itemArr){
        if(item.category === categoryItems.name)
      } */
    }
  }


  hideShow = false;

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(categories => {
      this.categoryArr = categories;
      console.log('assigned categories: ', this.categoryArr);
    });

    this.itemService.getItems().subscribe(items => {
      this.itemArr = items;
      console.log('assigned items: ', this.itemArr);
    });
  }

  hide(): boolean {
    console.log(this.hideShow);
    return (this.hideShow = !this.hideShow);
  }
}
