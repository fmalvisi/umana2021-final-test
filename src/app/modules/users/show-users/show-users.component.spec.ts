import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User, UsersService } from 'src/app/core/api/generated';
import { CustomPipeEta } from '../etapipe.pipe';
import { ShowUsersComponent } from './show-users.component';

class mockdata{
  utenti : Array<User> = [{
    id : 1,
    name : "test1",
    surname : "test1",
    email : "test1",
    dob : "test1"
  },
  {
    id : 2,
      name : "test2",
      surname : "test2",
      email : "test2",
      dob : "test2"
  }
];
data : Observable<any> = of( {
  utente : this.utenti
})

} 
class mockuserservice{
  utenti : Array<User> = [{
    id : 1,
    name : "test1",
    surname : "test1",
    email : "test1",
    dob : "test1"
  },
  {
    id : 2,
      name : "test2",
      surname : "test2",
      email : "test2",
      dob : "test2"
  }
];
  getUsers() : Observable<Array<User>> {
    return of(this.utenti);
  }
}

fdescribe('ShowUsersComponent', () => {
  let component: ShowUsersComponent;
  let fixture: ComponentFixture<ShowUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ RouterTestingModule, HttpClientTestingModule ],
      declarations: [ ShowUsersComponent, CustomPipeEta ], 
      providers: [ {
        provide: ActivatedRoute, useClass: mockdata
      },{
        provide: UsersService, useClass: mockuserservice
      } ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("ricerca dovrebbe funzionare", ()=>{
    let ricerca = document.createElement("input");
    ricerca.value = "test1";
    spyOn(document, "getElementById").and.callFake(()=>{
      return ricerca;
    })
    component.ricerca();
    expect(component.cercati[0].id).toEqual(1);

    ricerca.value = "prova";
    component.ricerca();
    expect(component.cercati.length).toEqual(0);
  } );

  it("stampa nome trovato dovrebbe funzionare", ()=>{
    let utenti : Array<User> = [{
      id : 1,
      name : "test1",
      surname : "test1",
      email : "test1",
      dob : "test1"
    },
    {
      id : 2,
        name : "test2",
        surname : "test2",
        email : "test2",
        dob : "test2"
    }
  ];

  component.cercati = [utenti[0]];

  expect(component.stampaNomeTrovato(utenti[0])).toBeTrue();
  expect(component.stampaNomeTrovato(utenti[1])).toBeFalse();
  })

  it("aggiornaMostra dovrebbe funzionare", ()=>{
    component.aggiornaMostra();
    expect(component.aggiornaMostra()).toBeFalse();
  })


});

class mockerrordata{
  error = throwError(new Error("errore"));
  data: Observable<any> = this.error.pipe(catchError(err => {
    throw err
  }))
}

