import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { Item, ItemsService } from "src/app/core/api/generated";


@Injectable({
    providedIn: 'root'
})
export class DetailsItemResolver implements Resolve<Item>{
    constructor(
        private itemsService: ItemsService,
        private router : Router
    ){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Item> | Promise<Item> {
        console.log('Chiamato DetailsItemResolver...');
        return this.itemsService.getItem(route.params.id).toPromise().catch( error => {
            this.router.navigate(['items']);
            throw error;
        });
    }
}