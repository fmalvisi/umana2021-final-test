import { Category, Item } from 'src/app/core/api/generated';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { CategoriesTableComponent } from './categories-table.component';


describe('CategoriesTableComponent', () => {
  let component: CategoriesTableComponent;
  let fixture: ComponentFixture<CategoriesTableComponent>;
  let httpMock: HttpTestingController;

  

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CategoriesTableComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    // httpMock = TestBed.inject(HttpTestingController);
  });

  beforeEach(()=>{
    let categoryArr :Category[] = [
      {
        id : 1,
        name: 'Casa',
        description: 'cose per la casa'
      },
      {
        id: 2,
        name: 'Bagno',
        description: 'cose per il bagno'
      },
      {
        id: 3,
        name: 'Giardinaggio',
        description: 'accessori per il giardino'
      }
    ];
  
    let itemArr : Item[] = [
      {
        "id": 1,
        "name": "Yankee Candle",
        "description": "Usata, a metà.",
        "price": 15.5,
        "category": 1,
        "owner": null
      },
      {
        "id": 2,
        "name": "Testcasa",
        "description": "Usata bene.",
        "price": 9.99,
        "category": 1,
        "owner": null
      },
      {
        "id": 3,
        "name": "Testcucina1",
        "description": "Usata male.",
        "price": 50,
        "category": 2,
        "owner": null
      },
      {
        "id": 4,
        "name": "Testcucina2",
        "description": "Usata male.",
        "price": 30,
        "category": 2,
        "owner": null
      },
      {
        "id": 5,
        "name": "Testbagno1",
        "description": "Usata bene.",
        "price": 50,
        "category": 3,
        "owner": null
      },
      {
        "id": 6,
        "name": "Testbagno2",
        "description": "Usata male.",
        "price": 11.5,
        "category": 3,
        "owner": null
      },
      {
        "id": 7,
        "name": "Testbagno3",
        "description": "Usata male.",
        "price": 11.5,
        "category": 3,
        "owner": null
      },
      {
        "id": 8,
        "name": "Rastrello",
        "description": "Usata male.",
        "price": 11.5,
        "category": 4,
        "owner": null
      }
    ];
  
    let detailCategoryArr: boolean[] = [false, false, false];
  });


  it('should return number of items per category', ()=>{

    component.getNumOfItemsPerCategory(2);

    component.itemArr = [
      {
        "id": 1,
        "name": "Yankee Candle",
        "description": "Usata, a metà.",
        "price": 15.5,
        "category": 1,
        "owner": null
      },
      {
        "id": 2,
        "name": "Testcasa",
        "description": "Usata bene.",
        "price": 9.99,
        "category": 1,
        "owner": null
      },
      {
        "id": 3,
        "name": "Testcucina1",
        "description": "Usata male.",
        "price": 50,
        "category": 2,
        "owner": null
      },
      {
        "id": 4,
        "name": "Testcucina2",
        "description": "Usata male.",
        "price": 30,
        "category": 2,
        "owner": null
      },
      {
        "id": 5,
        "name": "Testbagno1",
        "description": "Usata bene.",
        "price": 50,
        "category": 3,
        "owner": null
      },
      {
        "id": 6,
        "name": "Testbagno2",
        "description": "Usata male.",
        "price": 11.5,
        "category": 3,
        "owner": null
      },
      {
        "id": 7,
        "name": "Testbagno3",
        "description": "Usata male.",
        "price": 11.5,
        "category": 3,
        "owner": null
      },
      {
        "id": 8,
        "name": "Rastrello",
        "description": "Usata male.",
        "price": 11.5,
        "category": 4,
        "owner": null
      }
    ];

    expect(component.getNumOfItemsPerCategory(2)).toEqual(2);
    //expect.(component.getNumOfItemsPerCategory).

  });

  it('should return "disabled" if category has more than 0 items',()=>{
    component.itemArr = [
      {
        "id": 1,
        "name": "Yankee Candle",
        "description": "Usata, a metà.",
        "price": 15.5,
        "category": 1,
        "owner": null
      },
      {
        "id": 2,
        "name": "Testcasa",
        "description": "Usata bene.",
        "price": 9.99,
        "category": 1,
        "owner": null
      },
      {
        "id": 3,
        "name": "Testcucina1",
        "description": "Usata male.",
        "price": 50,
        "category": 2,
        "owner": null
      },
      {
        "id": 4,
        "name": "Testcucina2",
        "description": "Usata male.",
        "price": 30,
        "category": 2,
        "owner": null
      },
      {
        "id": 5,
        "name": "Testbagno1",
        "description": "Usata bene.",
        "price": 50,
        "category": 3,
        "owner": null
      },
      {
        "id": 6,
        "name": "Testbagno2",
        "description": "Usata male.",
        "price": 11.5,
        "category": 3,
        "owner": null
      },
      {
        "id": 7,
        "name": "Testbagno3",
        "description": "Usata male.",
        "price": 11.5,
        "category": 3,
        "owner": null
      },
      {
        "id": 8,
        "name": "Rastrello",
        "description": "Usata male.",
        "price": 11.5,
        "category": 4,
        "owner": null
      }
    ];

     expect(component.willBeDisabled(2)).toEqual('disabled');
     expect(component.willBeDisabled(7)).toEqual('');

  });

  it('should change variable currentCategory to argument value', ()=>{

    component.updateCurrentCategory(2);
    expect(component.currentCategory).toBe(2);

  });

  it('should either return "Dettagli" or "Chiudi" depending on boolean value of the category',()=>{
    component.categoryArr = [
      {
        id : 1,
        name: 'Casa',
        description: 'cose per la casa'
      },
      {
        id: 2,
        name: 'Bagno',
        description: 'cose per il bagno'
      },
      {
        id: 3,
        name: 'Giardinaggio',
        description: 'accessori per il giardino'
      }
    ];
    component.detailCategoryArr = [false, true, false];

    expect(component.toggleClose(1)).toEqual('Dettagli');
    expect(component.toggleClose(2)).toEqual('Chiudi');

  });

  it('should handle visibility of ComponentDetails managing boolean values in detailCategoryArr according to 3 different scenarios',()=>{

    component.categoryArr = [
      {
        id : 1,
        name: 'Casa',
        description: 'cose per la casa'
      },
      {
        id: 2,
        name: 'Bagno',
        description: 'cose per il bagno'
      },
      {
        id: 3,
        name: 'Giardinaggio',
        description: 'accessori per il giardino'
      }
    ];
    component.detailCategoryArr = [false, false, false];

    component.hide(1);
    expect(component.detailCategoryArr[0]).toBe(true);

    component.hide(1);
    expect(component.detailCategoryArr[0]).toBe(false);

    //component.detailCategoryArr = [true, true, false];

    component.hide(2);
    expect(component.detailCategoryArr[0]).toBe(false);
    expect(component.detailCategoryArr[1]).toBe(true);

    //component.detailCategoryArr = [false, false, false];

  })

  
/* 
  it('should create', () => {
    expect(component).toBeTruthy();
  }); */

  /* it('#filterCategory() should add class "hidden" to categories that are not to be displayed', ) */

  /* it('#willBeDisabled(id) should return string "disabled" if category has more than 0 items', () => {
      
  }); */


});
