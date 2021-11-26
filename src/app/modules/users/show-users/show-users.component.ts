import { Component, OnInit } from '@angular/core';
import { User, UsersService } from 'src/app/core/api/generated';

@Component({
  selector: 'app-show-users',
  templateUrl: './show-users.component.html',
  styleUrls: ['./show-users.component.scss']
})
export class ShowUsersComponent implements OnInit {
  utenti: Array<User>=[]

  constructor(private api: UsersService) {
    this.api.getUsers().subscribe(users=>{
      this.utenti = users;
      console.log("ho caricato", this.utenti )

    })

   }

  ngOnInit(): void {
  }

}
