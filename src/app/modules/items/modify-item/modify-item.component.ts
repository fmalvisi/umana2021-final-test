import { Component, OnInit } from '@angular/core';
//import { CategoryService, Item, ItemsService, UsersService } from '../../../core/api/generated';
import { Form, NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { SuperItemService } from 'src/app/core/services/superItemService';
import { Item } from '../../../core/api/generated';
 


@Component({
  selector: 'app-modify-item',
  templateUrl: './modify-item.component.html',
  styleUrls: ['./modify-item.component.scss']
})
export class ModifyItemComponent implements OnInit {
  name_objects="nome_prova_pipe";
  description="descrizione_prova_pipe";
  price_euro="14";
  price_centesimi="22";
  category="categoria_prova"
  url_photo="url_prova_pipe";
  owner="proprietario"

  //prova api
  message: string|null = null;
  items:Item[] = [];
  item? : Item;
  fetchedItems :Item[] = [];
  itemProva$?: Observable<Item>;
  itemProva2$ = of(true);

  send(){
    var name_prov = document.getElementById("name_input") as HTMLInputElement
    this.name_objects= name_prov.value;
    console.log(this.name_objects)
  }
  

  onFormSubmit(userForm: NgForm) {
    console.log(userForm.value);
    console.log('Nome:' + userForm.controls['name_input'].value);
   
}



  constructor( private superService : SuperItemService,) { }

  ngOnInit(): void {
    this.items = this.superService.getItemList();

    // this.superService.getProva(1).subscribe(res => {
    //   this.item = res;
    //   console.log("dentro",this.item)
    // })

  }



}
