import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AggiungiComponent } from './aggiungi.component';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule, NgForm, FormsModule} from '@angular/forms';
import { of } from 'rxjs';
import { User, UsersService } from 'src/app/core/api/generated';
import { NgModule } from '@angular/core';
import { CustomPipeEta } from '../etapipe.pipe';

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
      id:1,
      name : "Mario",
      surname: "Rossi",
      email: "mario.rossi@email.com",
      dob:"02-01-1970"
  }
};

xdescribe('AggiungiComponent', () => {
  let component: AggiungiComponent;
  let fixture: ComponentFixture<AggiungiComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule, HttpClientTestingModule, ReactiveFormsModule, FormsModule
      ],
      declarations: [ AggiungiComponent,CustomPipeEta ],
      providers: [
        { provide: ActivatedRoute, useValue: { paramMap: of(convertToParamMap({})) }},
        { provide: UsersService, useClass: MockUser},
          NgForm,
          
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
 

  it('should create', () => {
    expect(component).toBeTruthy();

    
  });
  

  it ('onsubmit funziona', () => {
    let spy =spyOn(component['api'], "createUser").and.callThrough();
    expect(component.onsubmit(testForm));
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(component.utente);
    
  });

  it('should have Aggiungi il tuo utente', () => {
    const el =fixture.nativeElement;
    expect(el.querySelector('div.subtitle').textContent).toContain('Aggiungi il tuo utente');
  })



})





