import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Item, ItemsService } from 'src/app/core/api/generated';


import { ItemsResolverResolver } from './items-resolver.resolver';


class MockItemsService{
  oggetti:Array<Item>=[
    {
      id:1,
      name:"",
    }
  ]

  oggettoModificato:Item={
    id:1,
    name:"modificato"
  }


  getItems():Observable<Array<Item>>{
    return of(this.oggetti);
  }

  updateItem(id:number,oggetto:Item):Observable<any>{
    return of(this.oggettoModificato);
  }

}

fdescribe('ItemsResolverResolver', () => {
  let resolver: ItemsResolverResolver;
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
          provide:ItemsService,useClass:MockItemsService
        },
        // {
        //   provide:ActivatedRoute,useValue: { paramMap: of(convertToParamMap({id:1})) }
        // },
        

      ]
    });
    resolver = TestBed.inject(ItemsResolverResolver);

    
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });

  it('items resolver should work',()=>{
  let snapshot:ActivatedRouteSnapshot=new ActivatedRouteSnapshot();
  //snapshot.data={id:1};
  snapshot.params={id:1};
  state = {url: '', root: snapshot};
  spyOn(resolver['items'],'getItems').and.callThrough();
    resolver.resolve(snapshot,state);
    expect(resolver['items'].getItems).toHaveBeenCalledTimes(1);
  })
});



class MockEItemsService{
  /*getItems():Observable<any>{
    return of(throwError(new Error('errore finto')));
  }

  updateItem():Observable<any>{
    return of(throwError(new Error('errore finto')));
  }*/
  errore=throwError(new Error('errore'));
  getItems():Observable<any>{
    return this.errore.pipe(catchError(err=>{
      return err;
    }));
  }
}


fdescribe('items resolver error',()=>{
  let resolver: ItemsResolverResolver;
  let state: RouterStateSnapshot;
  let mockitems:MockEItemsService=new MockEItemsService;
    

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        RouterTestingModule,
        HttpClientTestingModule,
        //Promise
      ],
      providers:[
        {
          provide:ItemsService,useValue:mockitems
        },
        // {
        //   provide:ActivatedRoute,useValue: { paramMap: of(convertToParamMap({id:1})) }
        // },
        

      ]
    });
    resolver = TestBed.inject(ItemsResolverResolver);
  });
    let snapshot:ActivatedRouteSnapshot=new ActivatedRouteSnapshot();
    //snapshot.data={id:1};
    snapshot.params={id:1};
    state = {url: '', root: snapshot};
    let errore=new Error('errore');
    it('items resolve dovrebbe dare errore', ()=>{
      resolver['items']=new MockEItemsService as unknown as ItemsService;
      spyOn(resolver['items'],'getItems');
      resolver.resolve(snapshot,state);
      expect(resolver['items'].getItems).toThrow('errore');
      
    })
})