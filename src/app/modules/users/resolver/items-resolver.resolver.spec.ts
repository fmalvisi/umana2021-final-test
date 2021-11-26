import { TestBed } from '@angular/core/testing';

import { ItemsResolverResolver } from './items-resolver.resolver';

describe('ItemsResolverResolver', () => {
  let resolver: ItemsResolverResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ItemsResolverResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
