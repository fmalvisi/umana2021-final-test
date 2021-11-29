import { CategoryDataService } from './../../service/category-data.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

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
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /* it('#filterCategory() should add class "hidden" to categories that are not to be displayed', ) */

  it('#willBeDisabled(id) should return string "disabled" if category has more than 0 items', ()=>{
    //component.willBeDisabled(2).ex
    for(let cat of component.categoryArr){
      if(component.getNumOfItemsPerCategory(cat.id) !== 0){
        let result = component.willBeDisabled(cat.id);
        expect(result).toBe('disabled');
      }else{
        let result = component.willBeDisabled(cat.id);
        expect(result).toBe('');
      }
    }
  })
});
