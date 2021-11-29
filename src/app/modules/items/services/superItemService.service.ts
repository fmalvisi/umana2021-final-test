import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map, tap } from "rxjs/operators";
import { ItemsService, Category, CategoryService, Item, User, UsersService } from "src/app/core/api/generated";

@Injectable({
    providedIn: 'root'
})
export class SuperItemService {
    fetchedItems: Item[] = [];
    fetchedCategories: Category[] = [];
    fetchedUsers: User[] = [];
    testItem: Item[] = [];
    singleItem?: Item;

    constructor( 
        private itemsService : ItemsService,
        private categoryService : CategoryService,
        private userService : UsersService
    ){}

    /*
    *   ritorna la lista degli oggetti
    */
    getItemList(): Promise<Item[]>{
        console.log('chiamato getItemList');
        this.fetchedItems = [];
        return this.itemsService.getItems().pipe(
            map(res => {
                console.log("getItemList risposta:", res);
                if(!res) {

                } else {
                    for(let item of res) {
                        this.fetchedItems.push(item);
                    }
                }
                return this.fetchedItems;
            })
        ).toPromise();
    }

    /*
    *   ritorna la un oggetto passato il suo identificatore
    */
    getItemById(index: number): Promise<Item> {
        console.log("chiamato getItem con id: ", index);
        const _promise = new Promise<Item>((resolve, reject) => {
            this.itemsService.getItem(index).toPromise().then(
                res =>{
                    console.log("risposta getItem", res);
                    resolve(res);
                },
                error => {
                    console.log("errore getItem: ", error);
                    reject(error);
                } 
            );
        });
        return _promise;
    }

    updateItem(item: Item): Observable<any>{
        console.log('oggetto ricevuto', item);
        return this.itemsService.updateItem(item.id!, item).pipe( tap( 
            res => console.log('risposta di updateItem ', res),
            error => console.log('errore di updateItem ', error))
        );
    }

    createItem(item: Item): Observable<any>{
        console.log('oggetto ricevuto', item);
        return this.itemsService.createItem(item).pipe( tap( 
            res => console.log('risposta di createItem ', res),
            error => console.log('errore di createItem ', error))
        );
    }

    deleteItem(index: number): Observable<any>{
        console.log('si vuole eliminare il prodotto con id,', index);
        return this.itemsService.deleteItem(index).pipe( tap( 
            res => console.log('risposta di createItem ', res),
            error => console.log('errore di createItem ', error))
        );
    }

    /*
    *   ritorna la lista degli utenti
    */
    getUserList(): Promise<User[]>{
        console.log('chiamato getUserList');
        this.fetchedUsers = [];
        return this.userService.getUsers().pipe(
            map(res => {
                console.log("getUserList risposta:", res);
                if(!res) {

                } else {
                    for(let user of res) {
                        this.fetchedUsers.push(user);
                    }
                }
                return this.fetchedUsers;
            })
        ).toPromise();
    }

    getUserById(index: number): Promise<User> {
        console.log("chiamato getItem con id: ", index);
        const _promise = new Promise<User>((resolve, reject) => {
            this.userService.getUser(index).toPromise().then(
                res =>{
                    console.log("risposta getItem", res);
                    resolve(res);
                },
                error => {
                    console.log("errore getItem: ", error);
                    reject(error);
                } 
            );
        });
        return _promise;
    }

    /*
    *   ritorna la lista delle categorie
    */
    getCategoryList(): Promise<Category[]>{
        console.log('chiamato getCategoryList');
        this.fetchedCategories = [];
        return this.categoryService.getCategories().pipe(
            map(res => {
                console.log("getCategoryList risposta:", res);
                if(!res) {

                } else {
                    for(let category of res) {
                        this.fetchedCategories.push(category);
                    }
                }
                return this.fetchedCategories;
            })
        ).toPromise();
    }

    getCategoryById(index: number): Promise<Category> {
        console.log("chiamato getItem con id: ", index);
        const _promise = new Promise<Category>((resolve, reject) => {
            this.categoryService.getCategory(index).toPromise().then(
                res =>{
                    console.log("risposta getItem", res);
                    resolve(res);
                },
                error => {
                    console.log("errore getItem: ", error);
                    reject(error);
                } 
            );
        });
        return _promise;
    }
}