import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { User, UsersService } from 'src/app/core/api/generated';

@Injectable({
  providedIn: 'root'
})
export class ResolverleoResolver implements Resolve<Array<User>> {
  constructor(private api: UsersService){

  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Array<User>> | Promise<Array<User>> {
    return this.api.getUsers().toPromise();
  }
}
