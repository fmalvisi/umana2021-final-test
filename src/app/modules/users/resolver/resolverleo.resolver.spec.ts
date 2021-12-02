import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of } from 'rxjs';
import { User, UsersService } from 'src/app/core/api/generated';

import { ResolverleoResolver } from './resolverleo.resolver';

class MockApi{

  tester:User={
    id:1,
    name:"useruno",
    surname:"useruno",
    dob:"01-01-1000",
    email:"unser1@user.user"
  }
  tester2:User={
    id:2,
    name:"userdue",
    surname:"userdue",
    dob:"01-01-1000",
    email:"user2@user.user"
  }
  utenti:Array<User>=[
    this.tester,
    this.tester2
  ]
  getUsers():Observable<Array<User>>{

    
    return of(this.utenti);
  }
}

describe('ResolverleoResolver', () => {
  let resolver: ResolverleoResolver;
  let state: RouterStateSnapshot;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        RouterTestingModule,
        HttpClientTestingModule,
        //Promise
      ],
      providers:[
        {
          provide:UsersService,useClass:MockApi
        },
     
      ]
    });
    resolver = TestBed.inject(ResolverleoResolver);

    
  });

  let snapshot:ActivatedRouteSnapshot=new ActivatedRouteSnapshot();
  //snapshot.data={id:1};
  snapshot.params={id:1};
  state = {url: '', root: snapshot};

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });

  it("resolve dovrebbe funzionare", () => {
    spyOn(resolver["api"], "getUsers").and.callThrough();
    resolver.resolve(snapshot, state);
    expect(resolver["api"].getUsers).toHaveBeenCalledTimes(1);
  })
});

