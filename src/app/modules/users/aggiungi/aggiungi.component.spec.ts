import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AggiungiComponent } from './aggiungi.component';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule, NgForm, FormsModule, FormControl, Form} from '@angular/forms';
import { Observable, of } from 'rxjs';
import { User, UsersService } from 'src/app/core/api/generated';
import { NgModule } from '@angular/core';
import { By } from '@angular/platform-browser';

class Mockuserservice {
 
  
  
  user: Array<User> = [{
    id : 1,
    name : "andrea",
    surname : "andrea",
    email : "andrea",
    dob : "andrea"
  }];

  createUser (user: User) : Observable<User> {
    return of(this.user[0]);
  }

};




describe('AggiungiComponent', () => {
  let component: AggiungiComponent;
  let fixture: ComponentFixture<AggiungiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ RouterTestingModule, HttpClientTestingModule, ReactiveFormsModule, FormsModule],
      declarations: [ AggiungiComponent ],
      providers: [
        {provide:ActivatedRoute, useValue: { paramMap: of(convertToParamMap({})) }},
        { provide: UsersService, useClass: Mockuserservice},
        NgForm
      ]

    })
    .compileComponents();
  });

  beforeEach(async() => {
    fixture = await TestBed.createComponent(AggiungiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
 

  it('should create', () => {
    expect(component).toBeTruthy();  
  });
  
  it('should have Aggiungi  utente', () => {
    const el =fixture.debugElement.nativeElement;
    expect(el.querySelector('h4').textContent).toContain('Aggiungi utente');
  });

  it ('form validate', (() => {

 const el=fixture.debugElement.nativeElement;
 //let form : NgForm = new NgForm({nome:"", });
 
 const testForm = <NgForm><unknown>{
   /*value: {
       nome: "Hello",
       cognome: "World",
       email: "email",
       data: "data"
   }, */
   controls:{nome :String,
      cognome : String,
      email : String,
      data : String
},/*
   controls :   {
     nome: "Hello",
     cognome: "World",
     email: "email",
     data: "000000000000000000"
   }*/
 };
spyOn(console,"log").and.callThrough();
component.onsubmit(testForm);

expect(console.log).toHaveBeenCalledTimes(1);  
     

  }));

it ('test if funziona', ()=>{
  const testForm = <NgForm><unknown>{
    controls :   {
      nome: "",
      cognome: "",
      email: "",
      data: ""
    }
  };
  const el=fixture.debugElement.nativeElement;
  spyOn(console,"log").and.callThrough();
  component.onsubmit(testForm);
  expect(console.log).toHaveBeenCalledTimes(1);
})

    





})



