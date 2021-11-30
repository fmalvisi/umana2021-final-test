import { HttpEvent } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { Category } from 'src/app/core/api/generated';
import { CategoryDataService } from '../../service/category-data.service';

import { CategoriesEditComponent } from './categories-edit.component';

describe('CategoriesEditComponent', () => {
  let component: CategoriesEditComponent;
  let fixture: ComponentFixture<CategoriesEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CategoriesEditComponent],
      providers: [CategoryDataService],
      imports: [HttpClientTestingModule, RouterTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return to category main page', () => {
    spyOn(component['router'], 'navigate');
    component.goBack();
    expect(component['router'].navigate).toHaveBeenCalledWith(['categories']);
  });

  it('should test', () => {
    spyOn(component['categoryService'], 'getCategories').and.returnValue(
      of([
        {
          id: 2,
          name: 'Testcasa',
          description: 'Usata.',
          price: 9.99,
          category: 0,
          owner: null,
        },
      ] as unknown as HttpEvent<Category[]>),
    );

    component.editCat('nome', 'descriz');
    expect(component['categoryService'].getCategories).toHaveBeenCalled();
  });
});
