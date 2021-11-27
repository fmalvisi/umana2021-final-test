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
  description="";
  price_euro=0;
  price_centesimi=0;
  category=0
  url_photo="";
  owner=""
  prova="";
  
  message: string|null = null;
  items:Item[] = [];
  item? : Item;
  fetchedItems :Item[] = [];
  itemProva$?: Observable<Item>;
  itemProva2$ = of(true);
  mostra = true;

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
    this.name_objects=this.item.name
    this.description=this.item.description!
    this.price_euro=this.item.price!
    this.category=this.item.category!
    this.url_photo=this.item.imgurl!
    this.owner=this.owner!
    
  }).catch((error) => {
    window.alert("errore di chiamata API" + error);
  })
}


  constructor( private superService : SuperItemService, private route: ActivatedRoute, 
    ) { }

  ngOnInit(): void {

      this.route.paramMap.subscribe(params => {
        let id = params.get('id');
        this.id = Number(id);

        //imposto valori da visualizzare negli input:


    });

    this.getItemsId(this.id);

    

  }

}
