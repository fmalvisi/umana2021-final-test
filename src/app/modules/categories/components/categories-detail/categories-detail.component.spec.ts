import { HttpEvent } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { Item } from 'src/app/core/api/generated';
import { CategoryDataService } from '../../service/category-data.service';

import { CategoriesDetailComponent } from './categories-detail.component';

describe('CategoriesDetailComponent', () => {
  let component: CategoriesDetailComponent;
  let fixture: ComponentFixture<CategoriesDetailComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CategoriesDetailComponent],
      providers: [CategoryDataService],
      imports: [HttpClientTestingModule, RouterTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesDetailComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should save data ID and navigate to edit page', () => {
    spyOn(component['router'], 'navigate');
    spyOn(component['categoryDataService'], 'getCatId');
    component.edit();
    expect(component['router'].navigate).toHaveBeenCalledWith([
      'categories/edit',
      0,
    ]);
    expect(component['categoryDataService'].getCatId).toHaveBeenCalled();
  });

  fit('test', () => {
    spyOn(component['itemService'], 'getItems').and.returnValue(
      of([
        {
          id: 2,
          name: 'Testcasa',
          description: 'Usata.',
          price: 9.99,
          category: 0,
          owner: null,
        },
      ] as unknown as HttpEvent<Item[]>),
    );
    component.ngOnChanges();
    expect(component['itemService'].getItems).toHaveBeenCalledTimes(1);
    expect(component.categoryItems.length).toEqual(1);
  });
});
