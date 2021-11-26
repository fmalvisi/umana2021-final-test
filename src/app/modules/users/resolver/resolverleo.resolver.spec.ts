import { TestBed } from '@angular/core/testing';

import { ResolverleoResolver } from './resolverleo.resolver';

describe('ResolverleoResolver', () => {
  let resolver: ResolverleoResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ResolverleoResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
