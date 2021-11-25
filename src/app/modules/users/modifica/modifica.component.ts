import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { User, UsersService } from 'src/app/core/api/generated';
@Component({
  selector: 'app-modifica',
  templateUrl: './modifica.component.html',
  styleUrls: ['./modifica.component.scss']
})
export class ModificaComponent implements OnInit {
  nutenti=0;;
  id:number=-1;
  utente:User={
    id:null,
    name:'',
    surname:'',
    dob:'',
    email:''
  };
  checkform=this.fb.group({
    nome:['',[Validators.pattern(/^[a-zA-Z]*$/)]],
    /*cognome:['',[Validators.pattern(/[a-zA-Z]/)]],
    dob:['',[Validators.pattern(/[a-zA-Z]/)]],*/
  })


  constructor(private api:UsersService, private route:ActivatedRoute, private chkurl:Router, private fb:FormBuilder) { 
    /*chkurl.events.subscribe((val)=>{
      this.ngOnInit();
    })*/
  }

  prendiUtente(){
    this.api.getUser(this.id).subscribe(user=>{
      this.utente=user;
      console.log('ricevuto utente' , this.id,user);
    },error=>{
      console.log(error);
      this.chkurl.navigate(['/users']);
    });
  }


  ngOnInit(): void {
    this.route.params.subscribe(params=>{
      this.id=params.id;
      console.log('route attiva:',params.id);
      this.prendiUtente();
    })

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
