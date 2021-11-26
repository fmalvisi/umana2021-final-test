import { Injectable } from '@angular/core';
import { tick } from '@angular/core/testing';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
  ActivatedRoute
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User, UsersService } from 'src/app/core/api/generated';

@Injectable({
  providedIn: 'root'
})
export class UserResolverResolver implements Resolve<User> {
  utente:User | any=false;
  id=-1;
  constructor(private api:UsersService, private chkurl:Router, private rotta:ActivatedRoute){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User> | Promise<User> {
    /*this.id=route.params.id;
    console.log('id è ', this.id);
    this.api.getUser(this.id).subscribe(user=>{
      console.log('utente da get è ',user);
      this.utente=user;
      console.log('utente this.user è ', this.utente)
    },error=>{
      alert('utente non trovato');
      this.chkurl.navigate(["/users"]);
    })
    console.log(state.url , ' snapshot= ' , route.params.id);
    return this.utente;*/
    console.log("sono nel resolver");
    return this.api.getUser(route.params.id).toPromise().catch(error=>{
      console.log('utente non trovato');
      this.chkurl.navigate(['users']);
      throw error;
    });/*.pipe(map(res=>{
      console.log(res);
      if(res){
      return res
      } else {
        console.log('utente non trovato');
        this.chkurl.navigate(['users']);
        return res;
      }
    }
    ),catchError(error=>{
      throw error;
    })).toPromise();*/
  }


  
}
