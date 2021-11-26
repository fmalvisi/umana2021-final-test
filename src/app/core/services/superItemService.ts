import { Injectable } from "@angular/core";
import { Item, ItemsService } from "../api/generated";

@Injectable({
    providedIn: 'root'
})
export class SuperItemService {
    fetchedItems: Item[] = [];
    testItem: Item[] = [];
    singleItem?: Item;

    constructor( 
        private itemsService : ItemsService
        ){
    }

    getItemList(): Array<Item>{
        console.log("chiamato getItemList");
        let testItems: Item[] = [];
        this.itemsService.getItems().subscribe(itemsObj => {
            for(let item of itemsObj){
                testItems.push(item);
            }
        });
        return testItems;
    }

    // getItem(index: number): Item {
    //     console.log("chiamato getItem");
    //     const testItem = new;
    //     this.itemsService.getItem(index).subscribe(res => {
    //         testItem = res;
    //         this.singleItem = testItem
    //     });
    //     return this.singleItem!;
    // }

}