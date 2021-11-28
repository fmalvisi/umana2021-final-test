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

  detailCategoryArr: boolean[] = [];

 

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

    this.itemService
    .getItems()
    .subscribe(items => {
      this.itemArr = items;
      // console.log('assegnato itemArr: ', this.itemArr);
    });

    this.categoryService
    .getCategories()
    .subscribe(categories => {
      this.categoryArr = categories.sort((categoryA, categoryB)=> {
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
      for(let c of this.categoryArr){
        this.detailCategoryArr.push(false);
      }
      console.log('assigned categories: ', this.categoryArr);
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

  //Cancella la categoria corrispondente se questa ha 0 oggetti
  deleteCategory(id:any){

    if(this.getNumOfItemsPerCategory(id) === 0){
      this.categoryService.deleteCategory(id).subscribe(category => console.log('eliminata categoria: ', category));
      location.reload();
    }
    else{
      alert(`Impossibile cancellare, la categoria ha ${this.getNumOfItemsPerCategory(id)} oggetti al suo interno`);
    }
  }

  //Disabilita i bottoni "Cancella" in caso la categoria abbia elementi
  willBeDisabled(id:any){
    if(this.getNumOfItemsPerCategory(id) !== 0){
      return 'disabled';
    }
    return '' ;
  }

  updateCurrentCategory(categoryID: number | null) {
    return (this.currentCategory = categoryID);
    
  }

  toggleClose(categoryID:any){
    

    let detailIndex = 0;
    for(let i = 0 ; i < this.categoryArr.length; i++){
      if(this.categoryArr[i].id === categoryID){
        detailIndex = i;
      }
    }

    if(this.detailCategoryArr[detailIndex]){
      return 'Chiudi';
    }else {
      return 'Dettagli';
    }

  }
 
  hide(categoryID: any): void {
    
    let areAllFalse = this.detailCategoryArr.every(bool => bool === false);

    let detailIndex = 0;
    for(let i = 0 ; i < this.categoryArr.length; i++){
      if(this.categoryArr[i].id === categoryID){
        detailIndex = i;
      }
    } 
    
    if(areAllFalse){
      
      this.updateCurrentCategory(categoryID);
      this.detailCategoryArr[detailIndex] = !this.detailCategoryArr[detailIndex]

    }else if(this.detailCategoryArr[detailIndex]){
      this.detailCategoryArr[detailIndex] = false
    }else {
      alert('Puoi visualizzare solo i dettagli di una categoria alla volta.')
    }
    
  }
}
