import { Component, OnInit } from '@angular/core';
//import { CategoryService, Item, ItemsService, UsersService } from '../../../core/api/generated';
import { Form, NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { SuperItemService } from 'src/app/core/services/superItemService';
import { Item,Category,User } from '../../../core/api/generated'; 
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
  category_objects=0
  category_objects_selected="";
  url_photo="";
  owner="";
  prova="";


  url_img_input=""
  url_controller=false;
  
  message: string|null = null;
  items:Item[] = [];
  item? : Item;

  categories:Category[]=[];
  category?:Category;
  
  
  users:User[]=[]

  fetchedItems :Item[] = [];
  mostra = true;

  id=0;//id per richiamare getitemById

  load_url(){
    var url = document.getElementById("url") as HTMLInputElement
    this.url_img_input=url.value;
    this.url_controller=true;
  }

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
    this.category_objects=this.item.category!
    this.url_photo=this.item.imgurl!
    this.owner=this.owner!

    this.getCategories();
  }).catch((error) => {
    window.alert("errore di chiamata API" + error);
  })
}

getCategories(){
  this.superService.getCategoryList().then((res: Category[]) => {
    this.categories=res;

    if(this.category_objects!=null){
      this.getCategoryId(this.category_objects)
    }

  }).catch((error) => {
    window.alert("errore di chiamata API" + error);
    //this.returnHome;
  })
}

getCategoryId(id:number){
  //this.getCategories();

  this.superService.getCategoryById(id).then((res:Category)=>{
    this.category=res;

    //imposto valore category_objects_selected
    let controller_name=this.category.name;
    if(controller_name!==null){
    this.category_objects_selected=this.category.name;
    }

  }).catch((error)=>{
    window.alert("errore di chiamata API" + error);
  })
}


  constructor( private superService : SuperItemService, private route: ActivatedRoute, 
    ) { }

  ngOnInit(): void {

    //recupero id da url
      this.route.paramMap.subscribe(params => {
        let id = params.get('id');
        this.id = Number(id);

    });

    this.category_objects_selected="Nessuna categoria assegnata";

    this.getItemsId(this.id);

   //this.getCategoryId(this.category_objects)

  }

}
