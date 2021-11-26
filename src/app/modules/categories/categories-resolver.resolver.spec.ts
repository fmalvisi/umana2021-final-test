import { TestBed } from '@angular/core/testing';

import { CategoriesResolverResolver } from './categories-resolver.resolver';

describe('CategoriesResolverResolver', () => {
  let resolver: CategoriesResolverResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(CategoriesResolverResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
