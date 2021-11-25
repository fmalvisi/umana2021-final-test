import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificaComponent } from './modifica.component';

describe('ModificaComponent', () => {
  let component: ModificaComponent;
  let fixture: ComponentFixture<ModificaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
