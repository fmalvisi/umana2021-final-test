import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Category, CategoryService } from 'src/app/core/api/generated';

@Injectable({
  providedIn: 'root',
})
export class CategoriesResolver implements Resolve<Category> {
  constructor(private cats: CategoryService, private router: Router) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<Category> | Promise<Category> {
    // Resolver che compara l'id della pagina con quello nella lista delle Category, in caso di errore ritorna alla pagina categories
    return this.cats
      .getCategory(route.params.id)
      .toPromise()
      .catch(error => {
        this.router.navigate(['categories']);
        throw error;
      });
  }
}
