import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AggiungiComponent } from './aggiungi.component';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule, NgForm, FormsModule} from '@angular/forms';
import { of } from 'rxjs';
import { User, UsersService } from 'src/app/core/api/generated';
import { NgModule } from '@angular/core';
import { By } from '@angular/platform-browser';

mockutente : UsersService;

class MockUser {
  user = {
    "id": 2,
      "name": "Paolo",
      "surname": "Bianchi",
      "email": "paolo.bianchi@email.com",
      "dob": "'02-01-1970"
  }
  createUsermock (user: User) {
    return user;
  }
}

const testForm = <NgForm>{
  value: {
      nome : "Mario",
      cognome: "Rossi",
      email: "mario.rossi@email.com",
      data:"02-01-1970"
  }
};

describe('AggiungiComponent', () => {
  let component: AggiungiComponent;
  let fixture: ComponentFixture<AggiungiComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule, HttpClientTestingModule, ReactiveFormsModule, FormsModule
      ],
      declarations: [ AggiungiComponent ],
      providers: [
        { provide: ActivatedRoute, useValue: { paramMap: of(convertToParamMap({})) }},
        { provide: UsersService, useClass: MockUser},
          NgForm
      ]

    })
    .compileComponents();
  });

  beforeEach(async() => {
    httpMock = TestBed.inject(HttpTestingController)
    fixture = await TestBed.createComponent(AggiungiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
 

  fit('should create', () => {
    expect(component).toBeTruthy();  
  });
  

  it ('onsubmit funziona', (() => {
    spyOn(component,"onsubmit");
    let el=fixture.debugElement.query(By.css('button')).nativeElement;
    el.click()
    //component.onsubmit(testForm);
    expect(component.onsubmit).toHaveBeenCalledTimes(1);
  }));

  it('should have Aggiungi  utente', () => {
    const el =fixture.debugElement.nativeElement;
    expect(el.querySelector('h4').textContent).toContain('Aggiungi utente');
  });

  it('onsubmit should not work', ()=> {
    let el = fixture.debugElement.componentInstance;

  })



})





