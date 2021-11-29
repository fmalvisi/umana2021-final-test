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
    // this.api.getUsers().subscribe(users=>{
    //   this.utenti = users;
    //   console.log("ho caricato", this.utenti )

    // })
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
    let cerca = document.getElementById("cercaNome") as HTMLInputElement;
    this.api.getUsers(1, undefined, undefined, cerca.value + " ").subscribe(value => {
      this.cercati = value;
    },);
    console.log(this.cercati);
  }
}
