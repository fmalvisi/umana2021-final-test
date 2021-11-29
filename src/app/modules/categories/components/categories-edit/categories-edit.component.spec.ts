import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
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

  // fit('test', () => {
  //   component.editCat('Cucina', 'cose per la cucina');
  //   spyOn(component['categoryService'], 'getCategories').and.returnValue(
  //     of([
  //       {
  //         id: 1,
  //         name: 'Casa',
  //         description: 'cose per la casa',
  //       }
  //     ]),
  //   );
  // });
});
