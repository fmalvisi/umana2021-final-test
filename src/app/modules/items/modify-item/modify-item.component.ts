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
  name_objects="nome";
  description="descrizione_prova_pipe";
  price_euro="14";
  price_centesimi="22";
  category="categoria_prova"
  url_photo="url_prova_pipe";
  owner="proprietario"
  prova="prova";
  
  message: string|null = null;
  items:Item[] = [];
  item? : Item;
  fetchedItems :Item[] = [];
  itemProva$?: Observable<Item>;
  itemProva2$ = of(true);
  mostra = true;

  currentId: String= '';
  id=0;//id per richiamare getitemById




  send(){
    /*var name_prov = document.getElementById("name_input") as HTMLInputElement
    this.name_objects= name_prov.value;
    console.log(this.name_objects)
    console.log(this.item);*/
  }
  

  onFormSubmit(userForm: NgForm) {
    console.log(userForm.value);
    console.log('Nome:' + userForm.controls['name_input'].value);
}



getItemsId(id:number){
  this.superService.getItemById(id).then((res: Item) => {
    this.item = res;
  }).catch((error) => {
    window.alert("errore di chiamata API" + error);
  })
}


  constructor( private superService : SuperItemService, private route: ActivatedRoute, 
    ) { }

  ngOnInit(): void {

      this.route.paramMap.subscribe(params => {
        var id = params.get('id');
        //console.log(id);
        this.id = Number(id)
    });


    this.getItemsId(this.id);
  }

}
