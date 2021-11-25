import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/core/api/generated';
import { User } from 'src/app/core/api/generated';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-aggiungi',
  templateUrl: './aggiungi.component.html',
  styleUrls: ['./aggiungi.component.scss']
})
export class AggiungiComponent implements OnInit {

  constructor(private route: ActivatedRoute, protected router: Router, private userservice: UsersService) { }

  ngOnInit(): void { }

  onsubmit(form: NgForm){
    
    let nome = form.controls['nome'].value;
    let cognome = form.controls['cognome'].value;
    let email = form.controls['email'].value;
    let data = form.controls['data'].value;
    console.log(nome);
    this.userservice.createUser(nome, cognome,email,data );
   
    }
  }
 

  




