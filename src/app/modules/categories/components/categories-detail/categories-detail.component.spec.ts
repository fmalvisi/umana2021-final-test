import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
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
    component.edit();
    expect(component['router'].navigate).toHaveBeenCalledWith([
      'categories/edit',
      0,
    ]);
  });

  // describe('ngOnInit', () => {
  //   fit('makes expected calls', () => {
  //     spyOn(component['categoryService'], 'getCategories').and.callThrough();
  //     component.ngOnInit();
  //     expect(component['categoryService'].getCategories).toHaveBeenCalled();
  //   });
  // });
});
