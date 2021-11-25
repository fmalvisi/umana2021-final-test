import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AggiungiComponent } from './aggiungi.component';

describe('AggiungiComponent', () => {
  let component: AggiungiComponent;
  let fixture: ComponentFixture<AggiungiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AggiungiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AggiungiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
