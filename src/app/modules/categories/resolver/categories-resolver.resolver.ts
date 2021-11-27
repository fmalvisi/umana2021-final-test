import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Item, ItemsService } from 'src/app/core/api/generated';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CategoriesResolver implements Resolve<Array<Item>> {
  constructor(private items: ItemsService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<Array<Item>> | Promise<Array<Item>> {
    console.log('resolve???');
    return this.items.getItems();
  }
}
