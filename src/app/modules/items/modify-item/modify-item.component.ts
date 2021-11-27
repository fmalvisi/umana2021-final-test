import { Component, OnInit } from '@angular/core';
//import { CategoryService, Item, ItemsService, UsersService } from '../../../core/api/generated';
import { Form, NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { SuperItemService } from 'src/app/core/services/superItemService';
import { Item } from '../../../core/api/generated'; 
import { Observable, of } from 'rxjs';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-modify-item',
  templateUrl: './modify-item.component.html',
  styleUrls: ['./modify-item.component.scss']
})
export class ModifyItemComponent implements OnInit {
  name_objects="";
  description="descrizione_prova_pipe";
  price_euro="14";
  price_centesimi="22";
  category="categoria_prova"
  url_photo="url_prova_pipe";
  owner="proprietario"

  message: string|null = null;
  items:Item[] = [];
  item? : Item;
  fetchedItems :Item[] = [];
  itemProva$?: Observable<Item>;
  itemProva2$ = of(true);
  mostra = true;



  send(){
    /*var name_prov = document.getElementById("name_input") as HTMLInputElement
    this.name_objects= name_prov.value;
    console.log(this.name_objects)*/
    console.log(this.item)
    
  }
  

  onFormSubmit(userForm: NgForm) {
    console.log(userForm.value);
    console.log('Nome:' + userForm.controls['name_input'].value);
   
}



  constructor( private superService : SuperItemService, private route: ActivatedRoute,
    ) { }

  ngOnInit(): void {
    // this.item = this.superService.getItem(2)

  }
}




