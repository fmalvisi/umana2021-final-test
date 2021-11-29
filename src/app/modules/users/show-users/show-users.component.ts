import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User, UsersService } from 'src/app/core/api/generated';

@Component({
  selector: 'app-show-users',
  templateUrl: './show-users.component.html',
  styleUrls: ['./show-users.component.scss']
})
export class ShowUsersComponent implements OnInit {
  utenti: Array<User>=[]

  constructor(private route:ActivatedRoute, private api: UsersService) {
    this.route.data.subscribe(data => {
      this.utenti = data.utente;
    }, error => {
      console.log(error);
    })

   }

  ngOnInit(): void {
  }

  cercati : Array<User> = [];
  

  ricerca() : void{
    //console.log("gli utenti sono:", this.utenti);
    this.cercati = [];

    let cerca = document.getElementById("cercaNome") as HTMLInputElement;
    for (let i = 0; i < this.utenti.length; i++) {
     if (this.utenti[i].name == cerca.value || this.utenti[i].surname == cerca.value || this.utenti[i].email == cerca.value|| this.utenti[i].name + " " + this.utenti[i].surname == cerca.value) {
        this.cercati.push(this.utenti[i]);
      }  
    }
    if (this.cercati[0] == null) {
      alert("utente non trovato");
    }
    //console.log("gli utenti trovati sono:" , this.cercati);
  }
    stampaNomeTrovato(utente : User) : boolean{
      
    let controllo = false;

    for (let i = 0; i < this.cercati.length; i++) {
      if (this.cercati[i].name == utente.name) {
        controllo = true;
        break;
      }
    }
     return controllo;
  }

  mostra = true;

  aggiornaMostra(){
     this.mostra = !this.mostra;
  }

   devoMostrare(){
     return this.mostra;
   }

   evidenzio(controllo : boolean){
    return {'bg-primary !important' : controllo}
  }
}
