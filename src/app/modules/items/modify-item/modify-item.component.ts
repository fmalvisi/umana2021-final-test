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
  category_id=0;
  category_objects_selected="";//
  category_array:string[]=[]
  user_array:string[]=[]; //salvataggio di tutte le categorie
  user_array_i?:string;

  url_photo="";
  owner=0;
  owner_objects_selected="";
  
  //owner_objects_selected="";
  //owner_selected_id=0;
  prova="";

  prov="";


  url_img_input=""
  url_controller=false;
  
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

  //caricamento immagine
  load_url(){
    var url = document.getElementById("url") as HTMLInputElement
    this.url_img_input=url.value;
    this.url_controller=true;
  }

  send(){
  }
  
  //Item
  getItemsId(id:number){

    this.superService.getItemById(id).then((res: Item) => {
      this.item = res;
      this.name_objects=this.item.name
      this.description=this.item.description!
      this.price_euro=this.item.price!
      this.category_objects=this.item.category!
      this.url_photo=this.item.imgurl!
      this.owner=this.item.owner!


      this.getCategories();
      
      this.getUser();
      
      
    }).catch((error) => {
      window.alert("errore di chiamata API" + error);
    })
  }


  //Category
  //richiamata in getItemId()
  getCategories(){ 
    this.superService.getCategoryList().then((res: Category[]) => {
      this.categories=res;
     
  /*riempimento category_array*/
  for(let i =1; i<this.categories.length+1; i++){
    this.getCategoryId(i)
    }

      if(this.category_objects!=null){
        this.getCategoryId(this.category_objects)
      }

    }).catch((error) => {
      window.alert("errore di chiamata API" + error);
      //this.returnHome;
    })
  }

  //richiamata in getCategory()
  getCategoryId(id:number){
    //this.getCategories();

    this.superService.getCategoryById(id).then((res:Category)=>{
      this.category=res;
      this.category_id=this.category.id!;
       this.prov = this.category.name;
      
      //riempio category_arrey
      this.category_array.push(this.category.name)
      //imposto valore category_objects_selected
      let controller_name=this.category.name;

     //imposto valore category_id
     var id_prov = this.category.id;

      if(id_prov===this.category_objects){
        this.category_objects_selected=this.category.name;
      }

    }).catch((error)=>{
      window.alert("errore di chiamata API" + error);
    })
  }

  

  //users
  //richiamato in getItemId()
  getUser(){
    this.superService.getUserList().then((res:User[])=>{
      this.users=res;

      /*riempimento user_array*/
      for(let i =1; i<this.users.length+1; i++){
      this.getUserId(i)
      }
    });
  }

  //richiamato in getUser()
  getUserId(id:number){
  this.superService.getUserById(id).then((res:User)=>{
      this.user=res;
      var id_prov = this.user.id;

      this.user_array.push(this.user.name + " " + this.user.surname)

      //imposto valore owner_objects_selected
      if(this.owner===id_prov){
        this.owner_objects_selected=this.user.name + " " + this.user.surname;
        this.sortArrayUser();
      }

    }).catch((error)=>{
      window.alert("errore di chiamata API" + error);
    })
  }


  //ordinamento corretto array
  sortArrayUser(){
    let position_0=this.user_array[0];

    for(let i =0; i<this.user_array.length;i++){

      console.log(this.user_array[i])
      if(this.user_array[i]===this.owner_objects_selected){
        let i_x = this.owner_objects_selected
        this.user_array[0]=i_x;
        this.user_array[i]=position_0;
        //console.log("Trovato match " + position_0 + " " + this.user_array[i])

        //this.user_array.splice(i);
      } console.log("NUOVO ARRAY" + this.user_array[i] +" " + this.user_array[i-1])
      
    }

  }

  sortArrayCategory(){
    let position_0=this.category_array[0];

    for(let i =0; i<this.category_array.length;i++){

      console.log(this.category_array[i])
      if(this.category_array[i]===this.category_objects_selected){
        let i_x = this.category_objects_selected
        this.category_array[0]=i_x;
        this.category_array[i]=position_0;
        //console.log("Trovato match " + position_0 + " " + this.user_array[i])

        //this.user_array.splice(i);
      } console.log("NUOVO ARRAYccccc" + this.category_array[i] +" " + this.category_array[i-1])
      
    }

  }

  
    

    showCarouselItems(){
      if (typeof Storage !== "undefined") { 
        sessionStorage.setItem("showCarousel", "true");
      }else{
        console.log( "Sorry, your browser does not support Web Storage...");
      }
    }

    onFormSubmit(form: NgForm) {

      //in  onupdate?
      console.log(form.value);
      this.name_objects=form.controls["name_input"].value;
      this.description=form.controls["description_input"].value;
      this.price_euro=form.controls["price_euro"].value
      var prov1= document.getElementById("inputGroupCategory") as HTMLInputElement
      this.category_objects_selected=prov1.value;
      var prov2= document.getElementById("inputGroupUsers") as HTMLInputElement
      this.owner_objects_selected=prov2.value;
      this.url_img_input;

      console.log(this.url_img_input)
     
      //console.log('Password:' + userForm.controls['pass'].value);
  }

  /*
  updateItem(item:Item){
    this.superService.updateItem(item).then((res:Item)=>{
      this.item=res;
      this.
    }).catch((error)=>{
      window.alert("errore di chiamata API" + error);
    });
  }*/

    constructor( private superService : SuperItemService, private route: ActivatedRoute, 
      ) { }


    

  ngOnInit(): void {

    //recupero id da url
      this.route.paramMap.subscribe(params => {
        let id = params.get('id');
        this.id = Number(id);
    });


    this.category_objects_selected="Nessuna categoria assegnata";
    this.owner_objects_selected="Nessun utente assegnato"
    //this.category_array.push(this.owner_objects_selected)


    this.getItemsId(this.id);
    
  }

}
