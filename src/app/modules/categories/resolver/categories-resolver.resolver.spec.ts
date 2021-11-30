import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { CategoryService } from 'src/app/core/api/generated';

import { CategoriesResolver } from './categories-resolver.resolver';

describe('CategoriesResolver', () => {
  let resolver: CategoriesResolver;
  let state: RouterStateSnapshot;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(CategoriesResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });

  let snapshot: ActivatedRouteSnapshot = new ActivatedRouteSnapshot();

  snapshot.params = { id: 1 };
  state = { url: '', root: snapshot };
  it('resolve should be called once', () => {
    spyOn(resolver['cats'], 'getCategory').and.callThrough();
    resolver.resolve(snapshot, state);
    expect(resolver['cats'].getCategory).toHaveBeenCalledTimes(1);
  });
});
