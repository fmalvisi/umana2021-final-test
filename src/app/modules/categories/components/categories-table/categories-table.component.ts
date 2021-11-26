

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
  
  hideShow = false;

  constructor(
    private categoryService: CategoryService,
    private itemService: ItemsService,
  ) {}

  currentCategory: number | null = 0; 

  categoryArr: Category[] = [];

  itemArr: Item[] = [];

  numOfItemsArr: any[] = [];

  /* sortCategories(){

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

    console.log('containerArr 0: ', containerArr);

    containerArr = containerArr.sort((itemA, itemB):number =>{
      if(itemA.items.length > itemB.items.length){
        return 1;
      }
      if(itemA.items.length < itemB.items.length){
        return -1;
      }
      return 0;
    });

    console.log('container arr1 : ', containerArr);

    this.numOfItemsArr = containerArr;

    let sortedCategoryArr: Category[] = [];

    console.log('array di items ordinato: ', this.numOfItemsArr);

    for(let itemGroup of this.numOfItemsArr){
      for(let category of this.categoryArr){
        if(category.id === itemGroup.id){
          console.log('sto pushando');
          sortedCategoryArr.push(category);
        }
      }
    }

    this.categoryArr = sortedCategoryArr;
    console.log('categoryArr ordinato: ', this.categoryArr);

  } */


  

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(categories => {
      this.categoryArr = categories;
      console.log('assigned categories: ', this.categoryArr);
    });

    this.itemService.getItems().subscribe(items => {
      this.itemArr = items;
      console.log('assegnato itemArr: ', this.itemArr);
    });

  /*   this.sortCategories(); */
  }

  updateCurrentCategory(categoryID:number | null){
    this.currentCategory = categoryID;
  }

  hide(catgoryID :number | null): void {
    this.updateCurrentCategory(catgoryID);
    this.hideShow = !this.hideShow;
  }
}