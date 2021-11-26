import { Component, OnInit} from '@angular/core';
import { UsersService } from 'src/app/core/api/generated';
import { User } from 'src/app/core/api/generated';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgModel } from '@angular/forms';
import { CustomPipeEta } from '../etapipe.pipe';

@Component({
  selector: 'app-aggiungi',
  templateUrl: './aggiungi.component.html',
  styleUrls: ['./aggiungi.component.scss'],
  providers: [CustomPipeEta]
})
export class AggiungiComponent implements OnInit {
  anni: User={id:null,
  name: "",
  surname: "",
  email: "",
  dob:"" };
  constructor(private route: ActivatedRoute, protected router: Router, private api: UsersService, private custompipe: CustomPipeEta) {
   
  }
  
  ngOnInit(): void { }

  onsubmit(form: NgForm){
    
      let nome = form.controls['nome'].value;
      let cognome = form.controls['cognome'].value;
      let email = form.controls['email'].value;
      let data = form.controls['data'].value;
      let utente : User= { id : null,
      name : nome,
      surname: cognome,
      email: email,
      dob:data
      }
    
    if((nome != "") && (cognome != "") && (email != "") && (data != "")){
        console.log(utente);
        this.api.createUser(utente).subscribe(error=>{
        console.log(error);
        });
     }
    
    }
    
  }