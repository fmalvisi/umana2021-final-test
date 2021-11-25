import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesDetailComponent } from './categories-detail.component';

describe('CategoriesDetailComponent', () => {
  let component: CategoriesDetailComponent;
  let fixture: ComponentFixture<CategoriesDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoriesDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
