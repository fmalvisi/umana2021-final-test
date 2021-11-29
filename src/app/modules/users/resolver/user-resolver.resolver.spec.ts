import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, ActivatedRouteSnapshot, convertToParamMap, RouterStateSnapshot } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User, UsersService } from 'src/app/core/api/generated';

import { UserResolverResolver } from './user-resolver.resolver';


class MockSnaphot{
  params={
    id:1
  }
}

class MockActivatedRoute{
  params={id:1}
  snapshot={
    url:[]
  }
}


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
  getUser(id:number):Observable<User>{

    
    return of(this.utenti[id-1]);
  }
}
fdescribe('UserResolverResolver', () => {
  let resolver: UserResolverResolver;
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
        // {
        //   provide:ActivatedRoute,useValue: { paramMap: of(convertToParamMap({id:1})) }
        // },
        

      ]
    });
    resolver = TestBed.inject(UserResolverResolver);

    
  });
  let snapshot:ActivatedRouteSnapshot=new ActivatedRouteSnapshot();
  //snapshot.data={id:1};
  snapshot.params={id:1};
  state = {url: '', root: snapshot};
  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });

  it('resolve should work',()=>{
    spyOn(resolver['api'],'getUser').and.callThrough();
    resolver.resolve(snapshot,state);
    expect(resolver['api'].getUser).toHaveBeenCalledTimes(1);
  
});
});

class MockEuserService{

  /*getUser(id:number):Observable<any>{
    return of(throwError(new Error("errore finto")));
  }

  updateUser(id:number,utente:User):Observable<any>{
    return of(throwError(new Error("errore finto")));
  }

  deleteUser(id:number):Observable<any>{
    return of(throwError(new Error("errore finto")));
  }*/
  errore=throwError(new Error('errore'));
  getUser(id:number):Observable<any>{
    return this.errore.pipe(catchError(err=>{
      return err;
    }));
  }
  updateUser(id:number,utente:User):Observable<any>{
    return this.errore.pipe(catchError(err=>{
      return err;
    }));
  }
  deleteUser(id:number):Observable<any>{
    return this.errore.pipe(catchError(err=>{
      return err;
    }));
  }
}

fdescribe('resolver errore',()=>{
  let resolver: UserResolverResolver;
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
          provide:UsersService,useClass:MockEuserService
        },
        // {
        //   provide:ActivatedRoute,useValue: { paramMap: of(convertToParamMap({id:1})) }
        // },
        

      ]
    });
    resolver = TestBed.inject(UserResolverResolver);

    
  });
  let snapshot:ActivatedRouteSnapshot=new ActivatedRouteSnapshot();
  //snapshot.data={id:1};
  //snapshot.params={id:3};
  snapshot.params={id:1};
  state = {url: '', root: snapshot};
  it('resolve dovrebbe dare errore',()=>{
    resolver['api']=new MockEuserService as unknown as UsersService;
    spyOn(resolver['api'],'getUser').and.callThrough();
    resolver.resolve(snapshot,state);
    expect(resolver['api'].getUser).toHaveBeenCalledTimes(1);

  })
})