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
      "imgurl": "https://m0.her.ie/wp-content/uploads/2018/02/04134743/IMG_8789.jpg",
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

  let detailCategoryArr: boolean[] = [false, false, false]

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

  
/* 
  it('should create', () => {
    expect(component).toBeTruthy();
  }); */

  /* it('#filterCategory() should add class "hidden" to categories that are not to be displayed', ) */

  /* it('#willBeDisabled(id) should return string "disabled" if category has more than 0 items', () => {
      
  }); */


});
