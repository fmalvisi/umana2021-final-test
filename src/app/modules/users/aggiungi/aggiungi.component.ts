import { Component, OnInit} from '@angular/core';
import { UsersService } from 'src/app/core/api/generated';
import { User } from 'src/app/core/api/generated';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgModel } from '@angular/forms';


@Component({
  selector: 'app-aggiungi',
  templateUrl: './aggiungi.component.html',
  styleUrls: ['./aggiungi.component.scss'],

})
export class AggiungiComponent implements OnInit {
  utente: User={id:null,
  name: "",
  surname: "",
  email: "",
  dob:"" };
  form: any;
  constructor(private route: ActivatedRoute, protected router: Router, private api: UsersService ) {
   
  }

  //form: NgForm;
  ngOnInit(): void { }

  onsubmit(form: NgForm){
    
      let nome = form.controls['nome'].value;
      let cognome = form.controls['cognome'].value;
      let email = form.controls['email'].value;
      let data = form.controls['data'].value as string;
      data=data.substr(8,2)+"-"+data.substr(5,2)+"-"+data.substr(0,4);
      this.utente = { id : null,
      name : nome,
      surname: cognome,
      email: email,
      dob:data
      }
    
    if((nome != "") && (cognome != "") && (email != "") && (data != "")){
        console.log(this.utente);
        this.api.createUser(this.utente).subscribe((error: any)=>{
        console.log(error);
        this.router.navigate(['/users']);
        });
     }
    
    }
    
  }