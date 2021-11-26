import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Item, ItemsService } from 'src/app/core/api/generated';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CategoriesResolver implements Resolve<Item> {
  constructor(private api: ItemsService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<Item> | Promise<Item> | any {
    return console.log('resolve???');
  }
}
