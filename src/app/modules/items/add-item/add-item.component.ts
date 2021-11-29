import { Component, OnInit } from '@angular/core';
//import { CategoryService, Item, ItemsService, UsersService } from '../../../core/api/generated';
import { NgForm } from '@angular/forms';
import { Item,Category,User } from '../../../core/api/generated'; 
import { Router } from '@angular/router';
import { SuperItemService } from '../services/superItemService';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})

export class AddItemComponent implements OnInit {
  name_objects="";
  description="";
  price_euro=0;
  price_centesimi=0;
  category_objects=0
  category_objects_selected="";
  url_photo="";
  owner=0;
  owner_objects_selected="";
  //owner_objects_selected="";
  //owner_selected_id=0;
  prova="";
  categorySelected ="null";
  ownerSelected ="null"; 
  newCategoryId = 0;
  newOwnerId = 0;
  newItemId = 0;
  lastId = 0;

  url_img_input=""
  url_controller=false;
  newUrl = "";
  message: string|null = null;
  items:Item[] = [];
  item? : Item;

  categories:Category[]=[];
  category?:Category;
  
  
  users:User[]=[];
  user?:User;

  fetchedItems :Item[] = [];
  mostra = true;

  id=0;//id per richiamare getitemById


  ngOnInit(): void {
    this.category_objects_selected="Nessuna categoria assegnata";
    this.owner_objects_selected="Nessun utente assegnato";
    this.getCategories();
    this.getUser();
    this.getItems();
  }
  constructor( private superService : SuperItemService, private route: Router, 
    ) { }

  //caricamento immagine
  load_url(){
    var url = document.getElementById("url") as HTMLInputElement
    this.url_img_input=url.value;
    this.url_controller=true;
  } 
  //Category
  //richiamata in getItemId()
  getCategories(){ 
    this.superService.getCategoryList().then((res: Category[]) => {
      this.categories=res; 
    }).catch((error) => {
      window.alert("errore di chiamata API2" + error);
      //this.returnHome;
    })
  }

  getUser(){
    this.superService.getUserList().then((res:User[])=>{
      this.users=res; 
    }).catch((error) => {
      window.alert("errore di chiamata API3" + error);
      //this.returnHome;
    })
  }

  getItems(){
    this.superService.getItemList().then((it:Item[])=>{
      this.items=it; 
    }).catch((error) => {
      window.alert("errore di chiamata API4" + error);
      //this.returnHome;
    })
  }

  createNewItem(item:Item){
    this.superService.createItem(item).subscribe(() =>{
      console.log('oggetto aggiunto!');
      //this.getItems();   
    }) 
  }
    
    showCarouselItems(){
      if (typeof Storage !== "undefined") { 
        sessionStorage.setItem("showCarousel", "true");
      }else{
        console.log( "Sorry, your browser does not support Web Storage...");
      }
    } 

    returnHome() {
      this.route.navigate(['/items']); 
    }

    checkImgUrl(url:string){
      if(url == ""){
        this.newUrl = "https://montagnolirino.it/wp-content/uploads/2015/12/immagine-non-disponibile-300x225.png";
      }else{
        this.newUrl = url;
      }
    }
 
    onFormSubmit(userForm: NgForm) { 

      for (let cat of this.categories) {
        if(cat.name == this.categorySelected){
          this.newCategoryId = cat.id!; 
        }
      }
      for (let us of this.users) {
        let fullname = us.name + " "+us.surname;
        if(fullname == this.ownerSelected){
          this.newOwnerId = us.id!; 
        }
      }
      for (let it of this.items) {
        this.lastId = it.id!;  
      }
      this.newItemId = this.lastId + 1; 
      this.checkImgUrl(userForm.controls["url"].value);
      let newItem = {
        "id": this.newItemId,
        "name": userForm.controls["name_input"].value,
        "description": userForm.controls["description_input"].value,
        "price": userForm.controls["price_euro"].value,
        "imgurl": this.newUrl,
        "category": this.newCategoryId,
        "owner": this.newOwnerId
    }
      this.createNewItem(newItem); 
      //this.getItems();
      this.returnHome();
      
  }

  

}
