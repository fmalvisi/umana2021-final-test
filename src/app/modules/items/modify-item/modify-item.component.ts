import { Component, OnInit } from '@angular/core';
import { CategoryService, Item, ItemsService, UsersService } from '../../../core/api/generated';


@Component({
  selector: 'app-modify-item',
  templateUrl: './modify-item.component.html',
  styleUrls: ['./modify-item.component.scss']
})
export class ModifyItemComponent implements OnInit {
  name_objects="nome_prova_pipe";
  description="descrizione_prova_pipe";
  price="14.3";
  url_photo="url_prova_pipe";

  send(){
    var name_prov = document.getElementById("name_input") as HTMLInputElement
    this.name_objects= name_prov.value;
    console.log(this.name_objects)
  }
  



  constructor() { }

  ngOnInit(): void {
    console.log(this.name_objects)

  }



}
