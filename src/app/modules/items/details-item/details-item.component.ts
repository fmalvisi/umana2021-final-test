import { Component, OnInit } from '@angular/core';
import { Category, Item, User } from '../../../core/api/generated';
import { ActivatedRoute} from '@angular/router';
import { SuperItemService } from '../services/superItemService.service';

@Component({
  selector: 'app-details-item',
  templateUrl: './details-item.component.html',
  styleUrls: ['./details-item.component.scss']
})
export class DetailsItemComponent implements OnInit {
  name_objects="nome";
  description="descrizione_prova_pipe";
  price_euro= 0; 
  categoryId= 0;
  categoryName="";
  url_photo="https://montagnolirino.it/wp-content/uploads/2015/12/immagine-non-disponibile-300x225.png";
  ownerId=0;
  ownerName="";
  prova="prova";
  message: string|null = null;
  items:Item[] = [];
  item? : Item;
  user? : User;
  ownerObj? : User;
  categoryObj? : Category;
  fetchedItems :Item[] = [];
  mostra = true; 

  currentId: String= '';

  constructor(
    private superService : SuperItemService, 
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      let id = params.get('id');
      if (id !== null) {
        this.getItemsId(+id);
      }     
    });    
    this.route.snapshot.data;
  }
  
  getCategoryId(id:number){

    this.superService.getCategoryById(id).then((res: Category) => {
      this.categoryObj = res; 
      this.categoryName = this.categoryObj.name!;
      console.log("CATEGORIANOME",this.categoryName);
    }).catch((error) => {
      window.alert("errore di chiamata API" + error);
    })
  }

  getUserId(id:number){

    this.superService.getUserById(id).then((res: User) => {
      this.ownerObj = res; 
      this.ownerName = this.ownerObj.name + " " + this.ownerObj.surname; 
    }).catch((error) => {
      window.alert("errore di chiamata API22" + error);
    })
  }


  getItemsId(id:number){
    this.superService.getItemById(id).then((res: Item) => {
      this.item = res;
      this.name_objects= this.item.name;
      this.description= this.item.description!;
      this.price_euro= this.item.price!; 
      
      if (this.item.category != 0) {
        this.getCategoryId(this.item.category!); 
      } else {
        this.categoryName = "Nessuna categoria";
      }
      this.url_photo= this.item.imgurl!;
      
      if (this.item.owner != 0) {
        this.getUserId(this.item.owner!);
      } else {
        this.ownerName = "Nessun proprietario";
      }

    }).catch((error) => {
        window.alert("errore di chiamata API" + error);
    })
  }
  
  showCarouselItems(){
    if (typeof Storage !== "undefined") { 
      sessionStorage.setItem("showCarousel", "true");
    } else {
      console.log( "Sorry, your browser does not support Web Storage...");
    }
  }

}

 
