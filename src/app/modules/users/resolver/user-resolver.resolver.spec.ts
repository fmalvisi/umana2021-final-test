import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { UserResolverResolver } from './user-resolver.resolver';



class Mockroute{

}

class Mockstate{

}

class Mockapi{

}

describe('UserResolverResolver', () => {
  let resolver: UserResolverResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        RouterTestingModule,
        HttpClientTestingModule
      ],
      providers:[]
    });
    resolver = TestBed.inject(UserResolverResolver);

    
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
