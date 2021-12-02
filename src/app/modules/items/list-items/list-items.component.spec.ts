import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CategoryService, UsersService } from 'src/app/core/api/generated';
import { SuperItemService } from '../services/superItemService.service';

import { ListItemsComponent } from './list-items.component';

class superItemService {
  objects = [
    {
      "id": 1,
      "name": "Yankee Candle",
      "description": "Usata",
      "price": 15.5,
      "imgurl": "http://egress.storeden.net/jpg/5ffea3af00f220f2b3c1db01/file.jpg",
      "category": 0,
      "owner": 0
    }
  ];

}

describe('ListItemsComponent', () => {
  let component: ListItemsComponent;
  let fixture: ComponentFixture<ListItemsComponent>;
  let httpMock: HttpTestingController;
  let service: SuperItemService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [ ListItemsComponent ],
      providers: [
        UsersService, SuperItemService, CategoryService
      ]
    })
    .compileComponents();    
  });

  beforeEach( async () => {
    httpMock = TestBed.inject(HttpTestingController);
    fixture = await TestBed.createComponent(ListItemsComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(SuperItemService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return to home', () => {
    spyOn(component['router'], "navigate");
    component.returnHome();

    expect(component['router'].navigate).toHaveBeenCalled();
    expect(component['router'].navigate).toHaveBeenCalledTimes(1);
    expect(component['router'].navigate).toHaveBeenCalledOnceWith(['/']);
  });

  // beforeEach(() => {
  //   let store : any[] = []; 
  //   const mockSessionStorage = {
  //     getItem: (key: string): string => {
  //       const i:number = store.indexOf(key);
  //       return key in store ? store[i] : null;
  //     },
  //     setItem: (key: string, value: string) => {
  //       const i:number = store.indexOf(key);
  //       store[i] = `${value}`;
  //     },
  //     removeItem: (key: string) => {
  //       const i:number = store.indexOf(key);
  //       delete store[i];
  //     },
  //     clear: () => {
  //       store = [];
  //     }
  //   };
  //   spyOn(sessionStorage, 'getItem')
  //     .and.callFake(mockSessionStorage.getItem);
  //   spyOn(sessionStorage, 'setItem')
  //     .and.callFake(mockSessionStorage.setItem);
  //   spyOn(sessionStorage, 'removeItem')
  //     .and.callFake(mockSessionStorage.removeItem);
  //   spyOn(sessionStorage, 'clear')
  //     .and.callFake(mockSessionStorage.clear);
  // });

  it('should add sessionStorage', () => {
    component.add();
    expect(typeof Storage).not.toBeUndefined();
    expect(component.add).toBeTruthy();
    
  });

  it('should modify sessionStorage', () => {
    component.modify(1);
    expect(typeof Storage).not.toBeUndefined();
    expect(component.modify).toBeTruthy();
  });

  it('should delete sessionStorage', () => {
    component.details(1);
    expect(typeof Storage).not.toBeUndefined();
    expect(component.details).toBeTruthy();
  });

  it('should delete an item', waitForAsync(() => {
    component.deleteItem(1);
   
    expect(component.deleteItem).toBeTruthy;
    expect(component.deleteItem).not.toBeNull;
    expect(component.deleteItem).not.toEqual(0);

    expect(service).toBeTruthy();

    service.deleteItem(1).subscribe((res) => {
      expect(res).toBeTruthy();
      expectAsync(service.getItemList).toBePending();
      expectAsync(service.getItemList).toBeResolved();
    });
  }));  


  it('should getItems', waitForAsync(() => {
    const objects = [
      {
        "id": 1,
        "name": "Yankee Candle",
        "description": "Usata",
        "price": 15.5,
        "imgurl": "http://egress.storeden.net/jpg/5ffea3af00f220f2b3c1db01/file.jpg",
        "category": 0,
        "owner": 0
      }
    ];

    component.getItems();
    expect(component.getItems).toBeTruthy();

    service.getItemList().then(() => {
      expect(objects).toEqual(superItemService.arguments);
    });
  }))

  it('should NOT getItems', waitForAsync(() => {
        
    expect(service).toBeTruthy();
    component.getItems();
    expect(component.getItems).toBeTruthy();
    const mockErrorResponse = {status: 400, statusText: 'Bad Request'};

    service.getItemList().then(() => {
          //inject del mockErrorResponse
        }, (error) => {
        expect(error).toBeTruthy();
        expect(error.statusText).toEqual('Bad Request');
        expect(component.returnHome).toHaveBeenCalledTimes(1);
    });

    // const req = httpMock.not.expectOne('https://dev.frontend.local/api/v1/items');
    // expect(req.request.method).toEqual('GET');
    // req.flush({}, mockErrorResponse);

    // httpMock.verify();
}));

});
