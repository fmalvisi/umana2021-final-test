import { AfterViewInit, Component, DoCheck, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Item, ItemsService, User, UsersService } from 'src/app/core/api/generated';
@Component({
  selector: 'app-modifica',
  templateUrl: './modifica.component.html',
  styleUrls: ['./modifica.component.scss']
})
export class ModificaComponent implements DoCheck {
  nutenti=0;
  oggetti:Array<Item>=[]
  id:number=-1;
  utente:User={
    id:null,
    name:'',
    surname:'',
    dob:'',
    email:''
  };
  showForm=false;
  checkform=this.fb.group({
    nome:['',[Validators.required,Validators.pattern(/^[a-zA-Z]*$/)]],
    cognome:['',[Validators.required,Validators.pattern(/^[a-zA-Z]*$/)]],
    dob:['',[Validators.required]],
    email:['',[Validators.required,Validators.pattern(/^[a-zA-Z0-9.]+@{1}[a-zA-Z0-9]+\.{1}[a-zA-Z0-9]{1,4}$/)]]
  })


  constructor(private api:UsersService, private route:ActivatedRoute, private chkurl:Router, private fb:FormBuilder, private items:ItemsService) {
    console.log('parto da qui');
    this.route.data.subscribe(data=>{
      //console.log("ok ",data);
      this.utente=data.utente;
      this.oggetti=[];
      for(let oggetto of data.items){
        if(oggetto.owner==this.utente.id || oggetto.owner==null){
          this.oggetti.push(oggetto);
        }
      }
    },error=>{
      console.log(error);
      this.chkurl.navigate(['/users']);
    })
    
    /*chkurl.events.subscribe((val)=>{
      this.ngOnInit();
    })*/
  }

  mostra(){
    return this.showForm;
  }

  Oggetti(){
    return this.oggetti;
  }
  aggiorna(){
    /*let fields=['name','surname','email'];
    let valori=[this.utente.name,this.utente.surname,this.utente.email];
    
    for(let c=0;c<fields.length;c++){
      console.log(fields[c]);
      (document.getElementById(fields[c]) as HTMLInputElement).value=valori[c];
      console.log(this.checkform.controls);
    };
    let idob=document.getElementById('dob') as HTMLInputElement;
    let dob=this.utente.dob.substr(7,4)+"-"+this.utente.dob.substr(4,2)+"-"+this.utente.dob.substr(1,2);
    console.log('dob è '+dob)
    idob.value=dob;*/
    this.showForm=true;
    this.checkform.setValue({
      nome:this.utente.name,
      cognome:this.utente.surname,
      dob:this.utente.dob,
      email:this.utente.email
    }
    )
    //console.log(this.showForm);
  }

  prendiUtente(){
    /*this.api.getUser(this.id).subscribe(user=>{
      this.utente=user;
      console.log('ricevuto utente' , this.id,user);
    },error=>{
      console.log(error);
      this.chkurl.navigate(['/users']);
    });*/
  }

  setItems(oggetto:Item){
    console.log(oggetto);
    if(oggetto.owner==null){
      oggetto.owner=this.utente.id;
    } else {
      oggetto.owner=null;
    }
    this.items.updateItem(oggetto.id!,oggetto).subscribe(error=>{
      console.log(error)
    });
  }

  onsubmit(){
    let id=this.utente.id;
    let name=(document.getElementById('name') as HTMLInputElement).value;
    let surname=(document.getElementById('surname') as HTMLInputElement).value;
    let dob=(document.getElementById('dob') as HTMLInputElement).value;
    let email=(document.getElementById('email') as HTMLInputElement).value;
    let editUser:User={
      id:id,
      name:name,
      surname:surname,
      dob:dob,
      email:email
    }
    this.utente=editUser;
    this.api.updateUser(id!,editUser).subscribe(error=>{
      console.log('errore', error)
    });
    
  }

  distruggiUtente(){
    let posso=true;
    for(let i=0;i<this.oggetti.length;i++){
      if(this.oggetti[i].owner==this.utente.id){
        posso=false;
      }
    }
    if(posso){
    this.api.deleteUser(this.utente.id!).subscribe(error=>{
      console.log(error);
    });
    }
  }
  
  ngDoCheck(): void {
    /*this.route.params.subscribe(params=>{
      this.id=params.id;
      console.log('route attiva:',params.id);
      this.prendiUtente();
    })*/
    if(!this.showForm){
    this.aggiorna();
    }
    /*this.api.updateUser(this.id,this.utente).subscribe(user=>{
      console.log(user);
    })*/
    /*this.api.getUsers().subscribe(users=>{
      this.nutenti=users.length+1;
      console.log(users.length);
    })*/
    //if(this.id<=this.nutenti){
      
  //} else {
  //  alert('utente non trovato');
  //  this.chkurl.navigate(['/users']);
  //}
  }

}
