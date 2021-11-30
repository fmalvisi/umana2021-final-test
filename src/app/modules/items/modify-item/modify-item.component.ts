import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Item,Category,User } from '../../../core/api/generated'; 
import { ActivatedRoute } from '@angular/router';
import { SuperItemService } from '../services/superItemService.service';

@Component({
  selector: 'app-modify-item',
  templateUrl: './modify-item.component.html',
  styleUrls: ['./modify-item.component.scss']
})
export class ModifyItemComponent implements OnInit {
  id_object=0;
  name_objects="";
  description="";
  price_euro=0;
  category_objects=0
  category_id=0;
  category_objects_selected="Nessuna categoria assegnata";//
  category_array:string[]=[]
  user_array:string[]=[];
  goodModifica = false;
  url_photo="";
  owner=0;
  owner_objects_selected="Nessun utente assegnato";
  url_img_input=""
  url_controller=false;
  items:Item[] = [];
  item? : Item;
  categories:Category[]=[];
  category?:Category;
  users:User[]=[];
  user?:User;
  id=0;//id per richiamare getitemById
  categorySelected ="null";
  ownerSelected ="null"; 
  newCategoryId = 0;
  newOwnerId = 0;
  newItemId = 0;

  constructor( 
    private superService : SuperItemService, private route: ActivatedRoute, 
  ) { }


  ngOnInit(): void {
      this.route.paramMap.subscribe(params => {
      let id = params.get('id');
      this.id = Number(id);
    });

    this.category_array.push(this.category_objects_selected);
    this.user_array.push(this.owner_objects_selected);

    this.getItemsId(this.id);    
  }
  
  //caricamento immagine
  load_url(){
    var url = document.getElementById("url") as HTMLInputElement
    this.url_img_input=url.value;
    this.url_controller=true;
  }

  //Item
  getItemsId(id:number){
    this.superService.getItemById(id).then((res: Item) => {
      this.item = res;
      this.id_object=this.item.id!
      this.name_objects=this.item.name
      this.description=this.item.description!
      this.price_euro=this.item.price!
      this.category_objects=this.item.category!
      this.url_photo=this.item.imgurl!
      this.owner=this.item.owner!
      
      this.getCategories();
      this.getUser();
    }).catch((error) => {
      console.log('error', error);
    })
  }

  //Category
  getCategories(){
    this.superService.getCategoryList().then((res: Category[]) => {
      this.categories=res;
           
      for(let i =1; i<this.categories.length+1; i++){
        this.getCategoryId(i)
      }
    }).catch((error) => {
      console.log('error', error);
    })
  }
  
  getCategoryId(id:number){
    this.superService.getCategoryById(id).then((res:Category)=>{
      this.category=res;
      this.category_id=this.category.id!;      
      this.category_array.push(this.category.name)
      var id_prov = this.category.id;

      if(id_prov===this.category_objects){
        this.category_objects_selected=this.category.name;
        this.sortArrayCategory();
      }
    }).catch((error)=>{
      console.log('error', error);
    })
  }

  //User
  getUser(){
    this.superService.getUserList().then((res:User[])=>{
      this.users=res;

      for(let i =1; i<this.users.length+1; i++){
        this.getUserId(i);
      }
    });
  }

  //richiamato in getUser()
  getUserId(id:number){
    this.superService.getUserById(id).then((res:User)=>{
      this.user=res;
      var id_prov = this.user.id;
      this.user_array.push(this.user.name + " " + this.user.surname)

      if(this.owner===id_prov){
        this.owner_objects_selected=this.user.name + " " + this.user.surname;
        this.sortArrayUser();
      }
    }).catch((error)=>{
      console.log('error', error);
    })
  }

  //ordinamento corretto array
  sortArrayUser(){
    let position_0=this.user_array[0];

    for(let i =0; i<this.user_array.length;i++) {      
      if(this.user_array[i]===this.owner_objects_selected) {
        let i_x = this.owner_objects_selected;
        this.user_array[0]=i_x;
        this.user_array[i]=position_0;
      }
    }
  }

  sortArrayCategory(){
    let position_0=this.category_array[0];

    for(let i =0; i<this.category_array.length;i++) {      
      if(this.category_array[i]===this.category_objects_selected) {
        let i_x = this.category_objects_selected;
        this.category_array[0]=i_x;
        this.category_array[i]=position_0;
      }      
    }
  }

  showCarouselItems(){
    if (typeof Storage !== "undefined") { 
      sessionStorage.setItem("showCarousel", "true");
    }else{
      console.log( "Sorry, your browser does not support Web Storage...");
    }
  }

  checkImgUrl(url:string){
    if(url == ""){
      this.url_photo = "https://montagnolirino.it/wp-content/uploads/2015/12/immagine-non-disponibile-300x225.png";
    }else{
      this.url_photo = url;
    }
  }

  onFormSubmit(form: NgForm) { 
    this.checkImgUrl(form.controls["url"].value);

    //controllo categoria
    for (let cat of this.categories) {
      if(cat.name == this.categorySelected) {
        this.newCategoryId = cat.id!; 
      }
      if(this.newOwnerId===0){
        this.newOwnerId= this.owner;
      }
    }

    //Controllo username
    for (let us of this.users) {
      let fullname = us.name + " "+us.surname;
      if(fullname == this.ownerSelected){
        this.newOwnerId = us.id!; 
      }  
      if(this.newCategoryId===0){
        this.newCategoryId= this.category_objects;
      }
    }

    if(this.categorySelected==="Nessuna categoria assegnata"){
      this.newItemForUpdate(this.newOwnerId, 0, form)
    }else if(this.ownerSelected==="Nessun utente assegnato"){
      this.newItemForUpdate(0, this.newCategoryId, form)
    }else if(this.ownerSelected==="Nessun utente assegnato"&&this.categorySelected==="Nessuna categoria assegnata"){
      this.newItemForUpdate(0, 0, form)
    }else{
      this.newItemForUpdate(this.newOwnerId, this.newCategoryId, form)
    }    
  }

  newItemForUpdate(owner:number, category:number, form:NgForm){
    let newItem = {
      "id": this.id_object,
      "name": form.controls["name_input"].value,
      "description": form.controls["description_input"].value,
      "price": form.controls["price_euro"].value,
      "imgurl": this.url_photo,
      "category":category,
      "owner": owner
    }
    this.updateItem(newItem); 
  }

  updateItem(item:Item){
    this.superService.updateItem(item).subscribe(() =>{
      this.goodModifica = true;
      setTimeout(() => {
        this.goodModifica = false; 
      }, 2000);        
    });
  }   
}
