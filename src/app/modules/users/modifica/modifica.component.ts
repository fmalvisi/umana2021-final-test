import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { User, UsersService } from 'src/app/core/api/generated';
@Component({
  selector: 'app-modifica',
  templateUrl: './modifica.component.html',
  styleUrls: ['./modifica.component.scss']
})
export class ModificaComponent implements AfterViewInit {
  nutenti=0;
  id:number=-1;
  utente:User={
    id:null,
    name:'',
    surname:'',
    dob:'',
    email:''
  };
  checkform=this.fb.group({
    nome:['',[Validators.required,Validators.pattern(/^[a-zA-Z]*$/)]],
    cognome:['',[Validators.required,Validators.pattern(/^[a-zA-Z]*$/)]],
    dob:['',[Validators.required]],
    email:['',[Validators.required,Validators.pattern(/^[a-zA-Z0-9.]+@{1}[a-zA-Z0-9]+\.{1}[a-zA-Z0-9]{1,4}$/)]]
  })


  constructor(private api:UsersService, private route:ActivatedRoute, private chkurl:Router, private fb:FormBuilder) {
    this.route.data.subscribe(data=>{
      console.log(data);
      try{
      this.utente=data.utente;
      }catch(error){
        console.log(error);
      }
    })
    
    /*chkurl.events.subscribe((val)=>{
      this.ngOnInit();
    })*/
  }

  aggiorna(){
    let fields=['name','surname','email'];
    let valori=[this.utente.name,this.utente.surname,this.utente.email];
    
    for(let c=0;c<fields.length;c++){
      console.log(fields[c]);
      (document.getElementById(fields[c]) as HTMLInputElement).value=valori[c];
      console.log(this.checkform.controls);
    };
    let idob=document.getElementById('dob') as HTMLInputElement;
    let dob=this.utente.dob.substr(7,4)+"-"+this.utente.dob.substr(4,2)+"-"+this.utente.dob.substr(1,2);
    console.log('dob è '+dob)
    idob.value=dob;
    this.checkform.setValue({
      nome:this.utente.name,
      cognome:this.utente.surname,
      dob:this.utente.dob,
      email:this.utente.email
    }
    )
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

  
  cambiautente(){
    this.chkurl.navigate(["/users/modifica/2"]);
  }



 
  
  ngAfterViewInit(): void {
    /*this.route.params.subscribe(params=>{
      this.id=params.id;
      console.log('route attiva:',params.id);
      this.prendiUtente();
    })*/
    this.aggiorna();
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
