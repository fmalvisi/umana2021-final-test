import { Component, OnInit } from '@angular/core';
import { CategoryService, ItemsService } from 'src/app/core/api/generated';
import { CategoryDataService } from '../../service/category-data.service';
import { Category, Item } from 'src/app/core/api/generated';

@Component({
  selector: 'app-categories-table',
  templateUrl: './categories-table.component.html',
  styleUrls: ['./categories-table.component.scss'],
})
export class CategoriesTableComponent implements OnInit {
  hideShow = false;

  constructor(
    private categoryService: CategoryService,
    private itemService: ItemsService,
  ) {}

  currentCategory: number | null = 0;

  categoryArr: Category[] = [];

  itemArr: Item[] = [];

  numOfItemsArr: any[] = [];

  getNumOfItemsPerCategory(categoryID: number | null): number {
    let counter = 0;
    for (let item of this.itemArr) {
      if (item.category === categoryID) {
        counter++;
      }
    }
    return counter;
  }

  ngOnInit(): void {
    this.itemService.getItems().subscribe(items => {
      this.itemArr = items;
      // console.log('assegnato itemArr: ', this.itemArr);
    });

    this.categoryService.getCategories().subscribe(categories => {
      this.categoryArr = categories.sort((categoryA, categoryB): number => {
        if (
          this.getNumOfItemsPerCategory(categoryA.id) >
          this.getNumOfItemsPerCategory(categoryB.id)
        ) {
          return -1;
        }
        if (
          this.getNumOfItemsPerCategory(categoryA.id) >
          this.getNumOfItemsPerCategory(categoryB.id)
        ) {
          return 1;
        }
        return 0;
      });
      // console.log('assigned categories: ', this.categoryArr);
    });

  }

  filterCategory(c: string):void{
    console.log('selezionata categoria: ', c);
    let toHide: string[] = [];
    let toShow: string = c.toLowerCase();

    for(let category of this.categoryArr){
      if(category.name !== c){
        toHide.push(category.name.toLowerCase());
      }
    }
    console.log('categorie da nascondere: ', toHide);
    for(let h of toHide){
      if(toHide.length < this.categoryArr.length){
        document.getElementById(h)?.classList.add('hidden');
      }else {
        document.getElementById(h)?.classList.remove('hidden');
      } 
    }
    document.getElementById(toShow)?.classList.remove('hidden');

  }

  updateCurrentCategory(categoryID: number | null) {
    return (this.currentCategory = categoryID);
  }

  hide(categoryID: number | null): void {
    this.updateCurrentCategory(categoryID);
    this.hideShow = !this.hideShow;
  }
}
