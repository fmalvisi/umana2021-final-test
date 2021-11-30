import { HttpEvent } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';


import { from, Observable, of, pipe, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Item, ItemsService, User, UsersService } from 'src/app/core/api/generated';

import { ModificaComponent } from './modifica.component';

class MockUserService{
  tester:User={
    id:1,
    name:"useruno",
    surname:"useruno",
    dob:"01-01-1000",
    email:"unser1@user.user"
  }
  tester2:User={
    id:2,
    name:"userdue",
    surname:"userdue",
    dob:"01-01-1000",
    email:"user2@user.user"
  }
  utenti:Array<User>=[
    this.tester,
    this.tester2
  ]

  utenteCancellato:User={
    id:null,
    name:"",
    surname:"",
    dob:"",
    email:""

  }

  getUsers():Observable<Array<User>>{
    return of(this.utenti);
  }

  getUser(id:number):Observable<User>{
    return of(this.utenti[id-1]);
  }

  updateUser(id:number,utente:User){
    return of(console.log("utente aggiornato"));
  }


  deleteUser(id:number){
    return of(this.utenteCancellato);
  }

}





class MockItemsService{
  oggetti:Array<Item>=[
    {
      id:1,
      name:"",
      owner:1
    },{
      id:5,
      name:"",
    },{
      id:2,
      name:"",
      owner:2
    }
  ]

  oggettoModificato:Item={
    id:1,
    name:"modificato"
  }


  getItems():Observable<Array<Item>>{
    return of(this.oggetti);
  }

  updateItem(id:number,oggetto:Item):Observable<any>{
    return of(this.oggettoModificato);
  }

}




class MockData{
  constructor(){}
  tester:User={
    id:1,
    name:"useruno",
    surname:"useruno",
    dob:"01-01-1000",
    email:"test@test.test"
  }

  id=1

  testitem:Array<Item>=
    [{id:1,
      name:"",},
      {id:3,
      name:""},
      {
        id:5,
        name:"",
        owner:4
      }
  ]



  data:Observable<any>=of({utente:this.tester,items:this.testitem})

}




let data=new MockData();


let tester:User={
  id:1,
  name:"",
  surname:"",
  dob:"01-01-1000",
  email:""
}



describe('ModificaComponent', () => {
  let component: ModificaComponent;
  let fixture: ComponentFixture<ModificaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[
        RouterTestingModule,
        HttpClientTestingModule,
        ReactiveFormsModule
      ],
      declarations: [ ModificaComponent ],
      providers:[
        {provider:UsersService, useClass:MockUserService},
        {provider:ItemsService, useClass:MockItemsService},
        {provide:ActivatedRoute,useClass:MockData},
        FormBuilder,
        //Router,
      ],

    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    console.log("AAAAAAAAAAAAAAAAAA primo test modifica component");
    expect(component).toBeTruthy();
  });

  it('costruttore dovrebbe funzionare',()=>{
    console.log('data nel test è ');
    console.log(component['route'].data);
    console.log(component.oggetti);
    console.log(component.dobc);
    console.log(component.utente);
    expect(component.oggetti).toBeTruthy();
    expect(component.utente).toBeTruthy();
    expect(component.dobc).toMatch('-');
    expect(component.oggetti.length).toEqual(2);
    console.log('nel test oggetti di component è ',component.oggetti);
  })

  it('should return oggetti',()=>{
    expect(component.Oggetti()).toBeTruthy();
  });

  it('test del form e controlli',()=>{

    component.utente=tester;

    expect(component.showForm).toBeFalse;
    expect(component.mostra()).toBeFalse;

    component.aggiorna();

    expect(component.showForm).toBeTrue;

    expect(component.mostra()).toBeTrue;

    component.checkform.setValue({
      nome:"aaaa",
      cognome:"bbbb",
      dob:"1111",
      email:"abc@def.ghi"
    });
    console.log("test del form group");

    expect(component.checkform.valid).toBeTrue();

    expect(component.checkform.controls.nome.valid).toBeTrue();

    expect(component.checkform.controls.cognome.valid).toBeTrue();

    expect(component.checkform.controls.dob.valid).toBeTrue();

    expect(component.checkform.controls.email.valid).toBeTrue();

    component.checkform.setValue({
      nome:"///",
      cognome:"///",
      dob:"",
      email:"aaaa"
    });
    expect(component.checkform.valid).toBeFalse();

    expect(component.checkform.controls.nome.valid).toBeFalse();

    expect(component.checkform.controls.cognome.valid).toBeFalse();

    expect(component.checkform.controls.dob.valid).toBeFalse();

    expect(component.checkform.controls.email.valid).toBeFalse();
  })

  it('test submit asinc form invalido',fakeAsync(()=>{
    let testinput=document.createElement("input");
    testinput.value="test";

    let result:User={
      id:1,
      name:'test',
      surname:'test',
      dob:'test',
      email:'test'
    }

    let spy=spyOn(document,'getElementById').and.callFake(()=>{
      return testinput;
    })

    let startutente=component.utente;

    component.checkform.setValue({
      nome:"//",
      cognome:"//",
      dob:"//",
      email:"//"
    });
    component.onsubmit();
    fixture.whenStable().then(()=>{
      tick(1001);
      expect(component.mostraNotifica).toBeFalse;
    })
  }
  ));

  it('test submit asinc form valido',fakeAsync(()=>{
    let testinput=document.createElement("input");
    testinput.value="test";

    let result:User={
      id:1,
      name:'test',
      surname:'test',
      dob:'test',
      email:'test'
    }

    let spy=spyOn(document,'getElementById').and.callFake(()=>{
      return testinput;
    })

    let startutente=component.utente;

    component.checkform.setValue({
      nome:"test",
      cognome:"test",
      dob:"test",
      email:"test@test.test"
    });
    component.onsubmit();
    fixture.whenStable().then(()=>{
      tick(1001);
      expect(component.mostraNotifica).toBeFalse;
    })
  }
  ));


  it("mostranotifica dovrebbe funzionare",()=>{
    expect(component.mostraNotifica()).toBeTruthy();
  })

  it("submit dovrebbe funzionare",()=>{

    let testinput=document.createElement("input");
    testinput.value="test";

    let result:User={
      id:1,
      name:'test',
      surname:'test',
      dob:'test',
      email:'test'
    }

    let spy=spyOn(document,'getElementById').and.callFake(()=>{
      return testinput;
    })

    let startutente=component.utente;

    component.checkform.setValue({
      nome:"//",
      cognome:"//",
      dob:"//",
      email:"//"
    })

    component.onsubmit();
    expect(component.utente.name).toMatch('useruno');
    expect(component.utente.surname).toMatch('useruno');
    expect(component.utente.dob).toMatch('01-01-1000');
    expect(component.utente.email).toMatch('test@test.test');

    component.checkform.setValue({
      nome:"test",
      cognome:"test",
      dob:"test",
      email:"test@test.test"
    })

    component.onsubmit();

    expect(component.utente.name).toMatch('test');
    expect(component.utente.surname).toMatch('test');
    expect(component.utente.dob).toMatch('test');
    expect(component.utente.email).toMatch('test');



  })

  it("tag dovrebbe funzionare",()=>{
    expect(component.tinvalid(true)).toMatch("campo non valido");
    expect(component.tinvalid(false)).toMatch("campo valido");

  })

  it("setitem dovrebbe funzionare",waitForAsync(()=>{
    component['items']=new MockItemsService as unknown as ItemsService;//*************************************************************************************************** 
    let oggetto:Item={
      id:1,
      name:"testitem",
      owner:1
    }
    console.log('oggetto owner prim è ',oggetto.owner);
    component.setItems(oggetto);
    console.log('oggetto owner dopo è ',oggetto.owner);
    expect(oggetto.owner).toBeNull();
    component['items'].updateItem(oggetto.id!,oggetto);
    fixture.whenStable().then(()=>{
    component.setItems(oggetto);
    expect(oggetto.owner).toEqual(1);
    //expect(component.setitemsprova).toBeTrue();
    });
    
  }))


  it('dob si dovrebbe aggiornare',()=>{
    let testinput=document.createElement("input");
    testinput.value="test";
    let spy=spyOn(document,"getElementById").and.callFake(()=>{
      return testinput;
    })
    component.updateDate();
    expect(testinput.value).toMatch(component.dobc);
  })


  it('distruggiutente dovrebbe funzionare',()=>{
    let oggetto:Item={
      id:1,
      name:"testitem",
      owner:component.utente.id
    };
    
    let utenteCancellato:User={
      id:null,
      name:"",
      surname:"",
      dob:"",
      email:""
  
    }

    let controllo=false;
    spyOn(component['api'],'deleteUser').and.callFake((id:number)=>{
      return throwError(new Error("errore finto"));
    });
    component.oggetti=[
        oggetto
    ]
    component.distruggiUtente();
    expect(component['api'].deleteUser).not.toHaveBeenCalledTimes(1);
    oggetto.owner=null;
    component.oggetti=[
      oggetto
    ]
    component.distruggiUtente();
    expect(component['api'].deleteUser).toHaveBeenCalledTimes(1);


  })

  it('distruggiutente async else',fakeAsync(()=>{
    let oggetto:Item={
      id:1,
      name:"testitem",
      owner:component.utente.id
    };
    
    let utenteCancellato:User={
      id:null,
      name:"",
      surname:"",
      dob:"",
      email:""
  
    }
    component.oggetti=[
      oggetto
  ]
  component.distruggiUtente();
  spyOn(component['chkurl'],'navigate');
  fixture.whenStable().then(()=>{
    tick(1001);
    expect(component.vedoNotifica).toBeFalse();
  })

  }))

  it('distruggiutente async if',fakeAsync(()=>{
    let oggetto:Item={
      id:1,
      name:"testitem",
      owner:component.utente.id
    };
    
    let utenteCancellato:User={
      id:null,
      name:"",
      surname:"",
      dob:"",
      email:""
  
    }
    component.oggetti=[]
  component.distruggiUtente();
  spyOn(component['chkurl'],'navigate');
  fixture.whenStable().then(()=>{
    tick(1001);
    expect(component['chkurl'].navigate).toHaveBeenCalledTimes(1);
  })

  }))

});


//-----------------------------------------------------------------------------------------------------------------------------------------


class MockEuserService{

  /*getUser(id:number):Observable<any>{
    return of(throwError(new Error("errore finto")));
  }

  updateUser(id:number,utente:User):Observable<any>{
    return of(throwError(new Error("errore finto")));
  }

  deleteUser(id:number):Observable<any>{
    return of(throwError(new Error("errore finto")));
  }*/
  errore=throwError(new Error('errore'));
  getUser(id:number):Observable<any>{
    return this.errore.pipe(catchError(err=>{
      return err;
    }));
  }
  updateUser(id:number,utente:User):Observable<any>{
    return this.errore.pipe(catchError(err=>{
      return err;
    }));
  }
  deleteUser(id:number):Observable<any>{
    return this.errore.pipe(catchError(err=>{
      return err;
    }));
  }
}








class MockEItemsService{
  /*getItems():Observable<any>{
    return of(throwError(new Error('errore finto')));
  }

  updateItem():Observable<any>{
    return of(throwError(new Error('errore finto')));
  }*/
  errore=throwError(new Error('errore'));
  getItems():Observable<any>{
    return this.errore.pipe(catchError(err=>{
      return err;
    }));
  }
}






class EMockData{

  //data:Observable<any>=Observable.throw(new Error('error'));
  //data:Observable<any>=Observable.throw(new Error('error'));
  errore=throwError(new Error('errore'));
  data:Observable<any>=this.errore.pipe(catchError(err=>{
    return err;
  }));
}


describe('ModificaComponent errori', () => {
  let component: ModificaComponent;
  let fixture: ComponentFixture<ModificaComponent>;
  let spiarouter={navigate:jasmine.createSpy("navigate")};
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[
        RouterTestingModule,
        HttpClientTestingModule,
        ReactiveFormsModule
      ],
      declarations: [ ModificaComponent ],
      providers:[
        {provider:UsersService, useClass:MockEuserService},
        {provider:ItemsService, useClass:MockEItemsService},
        {provide:ActivatedRoute,useClass:EMockData},
        FormBuilder,
        {provide:Router,useValue:spiarouter}
      ],

    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("constructor should be error",()=>{
    expect(spiarouter.navigate).toHaveBeenCalledTimes(1);
  });
  
})

describe('errori api',()=>{
  let component: ModificaComponent;
  let fixture: ComponentFixture<ModificaComponent>;
beforeEach(async () => {
  await TestBed.configureTestingModule({
    imports:[
      RouterTestingModule,
      HttpClientTestingModule,
      ReactiveFormsModule
    ],
    declarations: [ ModificaComponent ],
    providers:[
      {provider:UsersService, useClass:MockEuserService},
      {provider:ItemsService, useClass:MockEItemsService},
      {provide:ActivatedRoute,useClass:MockData},
      FormBuilder,
      //Router,
    ],

  })
  .compileComponents();
});

beforeEach(() => {
  fixture = TestBed.createComponent(ModificaComponent);
  component = fixture.componentInstance;
  fixture.detectChanges();
});

  it('onsubmit should give error',()=>{
    let testinput = document.createElement('input');
    testinput.value='test';
    let spy=spyOn(document,'getElementById').and.callFake(()=>{
      return testinput;
    });
    let spy2=spyOn(component['api'],'updateUser').and.throwError(new Error('errore'));
    component.checkform.setValue({
      nome:"test",
      cognome:"test",
      dob:"test",
      email:"test@test.test"
    });
    component.onsubmit();
    expect(component['api'].updateUser).toHaveBeenCalledTimes(1);//?


  });


});


