
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

  numOfItemsArr: any[] = [];

  sortCategories(){

    let containerArr = [];

    for(let category of this.categoryArr){
      
      let categoryItems = {
        id: category.id,
        items: new Array<Item>()
      };
      for(let item of this.itemArr){
        if(item.category === categoryItems.id){
          categoryItems.items.push(item)
        }
      }
      containerArr.push(categoryItems);
    }

    containerArr = containerArr.sort((itemA, itemB):number =>{
      if(itemA.items.length > itemB.items.length){
        return 1;
      }
      if(itemA.items.length < itemB.items.length){
        return -1;
      }
      return 0;
    });

    this.numOfItemsArr = containerArr;

    let sortedCategoryArr: Category[] = [];

    for(let itemGroup of this.numOfItemsArr){
      for(let category of this.categoryArr){
        if(category.id === itemGroup.id){
          sortedCategoryArr.push(category);
        }
      }
    }

    this.categoryArr = sortedCategoryArr;

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

    this.sortCategories();
  }

  

  hide(): boolean {
    console.log(this.hideShow);
    return (this.hideShow = !this.hideShow);
  }
}
