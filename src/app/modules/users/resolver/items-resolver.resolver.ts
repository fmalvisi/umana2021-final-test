import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Item, ItemsService } from 'src/app/core/api/generated';

@Injectable({
  providedIn: 'root'
})
export class ItemsResolverResolver implements Resolve<Array<Item>> {
  constructor(private items:ItemsService){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Array<Item>> | Promise<Array<Item>>{
    return this.items.getItems().toPromise().catch(error=>{
      throw error;
    });
  }
}
