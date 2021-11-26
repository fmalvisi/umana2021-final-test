import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
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

    getItem(index: number): Item {
        console.log("chiamato getItem");
        let testItem: Item;
        this.itemsService.getItem(index).subscribe(res => {
            testItem = res;
            this.singleItem = testItem
        });
        return this.singleItem!;
    }


    // getProva(index: number): Observable<Item> {
    //     return this.itemsService.getItem(index).pipe( tap(values => {
    //         console.log("valori", values);
    //     }));
    // }

    // getItem(index: number): Promise<Item> {
    //     console.log("chiamato getItem con id: ", index);
    //     const _promise = new Promise<Item>((resolve, reject) => {
    //         this.itemsService.getItem(index).toPromise().then(
    //             res =>{
    //                 console.log("risposta getItem", res);
    //                 resolve(res);
    //             },
    //             error => {
    //                 console.log("errore getItem: ", error);
    //                 reject(error);
    //             } 
    //         );
    //     });
    //     return _promise;
    // }

}