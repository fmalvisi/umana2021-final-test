import { Component, OnInit } from '@angular/core'; 
import { Router } from '@angular/router';
import { Category, Item, User } from '../../../core/api/generated';  
import { SuperItemService } from '../services/superItemService';

@Component({
  selector: 'app-list-items',
  templateUrl: './list-items.component.html',
  styleUrls: ['./list-items.component.scss']
})
export class ListItemsComponent implements OnInit {
  
  message: string|null = null;
  items: Item[] = [];
  itemsFiltrati: Item[] = [];
  categories: Category[] = [];
  users: User[] = [];
  item? : Item;
  mostra = true;
  mostraFiltri = false;
  oggettiFiltrati = false;
  saveUser: User[] = [];
  searchUser: User[] = [];
  saveItems: Item[] = [];
  searchItems: Item[] = [];
  filtriInUso = [{tipo: '', id: 0, nome:''}];
   

  constructor(
    private superService : SuperItemService,
    private router : Router
  ) { 
  }

  ngOnInit(): void {      
    this.getItems();  
    console.log("provaprovaprova");  
    this.filtriInUso.splice(0,1);
  }

  ngDoCheck(){
    
    if(this.router.url == "/items"){
      if (typeof Storage !== "undefined") { 
        sessionStorage.setItem("showCarousel", "true");
      }else{
        console.log( "Sorry, your browser does not support Web Storage...");
      }
    }

    if (typeof Storage !== "undefined") {  
      let txtvalue =  sessionStorage.getItem("showCarousel"); 
      if(txtvalue == null){
        this.mostra = true;
      }else{
        if(txtvalue == "true"){ 
          this.mostra = true;
        }else{ 
          this.mostra = false;
        }
    } 
    }else {
      console.log("Sorry, your browser does not support Web Storage..."); 
    }
  }

  returnHome() {
    this.router.navigate(['/']);    
  }

  add(){
    if (typeof Storage !== "undefined") { 
      sessionStorage.setItem("showCarousel", "false");
    }else{
      console.log( "Sorry, your browser does not support Web Storage...");
    }
  }

  modify(index: number){
    if (typeof Storage !== "undefined") { 
      sessionStorage.setItem("showCarousel", "false");
    }else{
      console.log( "Sorry, your browser does not support Web Storage...");
    }
  }

  details(index: number){
    if (typeof Storage !== "undefined") { 
      sessionStorage.setItem("showCarousel", "false");
    }else{
      console.log( "Sorry, your browser does not support Web Storage...");
    }
  }

  deleteItem(index: number){
    if(index != null || index != 0){
      this.superService.deleteItem(index).subscribe(() =>{
        console.log('oggetto eliminato!')
        this.getItems();
      })
    }
    
  } 

  getItems(){
    this.superService.getItemList().then((res: Item[]) => {
      this.items = res;
    }).catch((error) => {
      window.alert("errore di chiamata API" + error);
      this.returnHome;
    })
  }

  getUsers(){
    this.superService.getUserList().then((res: User[]) => {
      this.users = res;
    }).catch((error) => {
      window.alert("errore di chiamata API" + error);
      this.returnHome;
    })
  }

  getCategories(){
    this.superService.getCategoryList().then((res: Category[]) => {
      this.categories = res;
    }).catch((error) => {
      window.alert("errore di chiamata API" + error);
      this.returnHome;
    })
  }

  useFilter(){
    this.mostraFiltri = !this.mostraFiltri;
    this.getCategories();
    this.saveUser = [];
    //Persistenza per gli utenti
    this.superService.getUserList().then((res: User[]) => {
      for(let user of res){
        this.saveUser.push(user);
      }
    }).catch((error) => {
      window.alert("errore di chiamata API" + error);
      this.returnHome;
    })
    //Persistenza per gli oggetti
    this.superService.getItemList().then((res: Item[]) => {
      for(let item of res){
        this.saveItems.push(item);
      }
    }).catch((error) => {
      window.alert("errore di chiamata API" + error);
      this.returnHome;
    })
  }

  filtraUtenti(event: any){
    this.searchUser = [];
    let input: string = event.target.value;    
    for(let user of this.saveUser){
      if(input !== '' && (user.name.toLowerCase().startsWith(input.toLowerCase()) || 
        user.surname.toLowerCase().startsWith(input.toLowerCase()))){
          this.searchUser.push(user);
      }
    }
  }

  filtraOggetti(event: any){
    this.searchItems = [];
    let input: string = event.target.value;    
    for(let item of this.saveItems){
      if(input !== '' && (item.name.toLowerCase().startsWith(input.toLowerCase()))){
          this.searchItems.push(item);
      }
    }
  }

  applicaFiltri(){
    console.log("Numero di filtri utilizzati: ",this.filtriInUso.length);
    if(this.filtriInUso.length !== 0){
      this.getFilteredItems();
      this.oggettiFiltrati = true;
    } else {
      this.oggettiFiltrati = false;
      this.getItems();
    }
    
  }

  rimuoviFiltri(){
    this.filtriInUso = [];
    window.location.reload();
  }

  chosenFilter(type: string, idF: number, name: string, event?: any){
    let tmpArray = {tipo: type, id: idF, nome: name};
    if(event === undefined || event.target.checked === true){
      this.filtriInUso.push(tmpArray);
    } else if(event !== undefined || event.target.cheched === false){
      for(let i=0; i<this.filtriInUso.length; i++){
        if(this.filtriInUso[i].tipo === type && this.filtriInUso[i].id === idF){
          this.filtriInUso.splice(i, 1);
        }
      }
    }
    
    console.log("filtri in uso", this.filtriInUso)
  }

  removeOneFilter(tipo: string, id:number, nome:string){
    if(tipo !== 'categoria'){
      for(let i=0; i<this.filtriInUso.length; i++){
        let filtro = this.filtriInUso[i];
        if(filtro.tipo === tipo && filtro.id === id && filtro.nome === nome){
          this.filtriInUso.splice(i, 1);
        }
      }
    }
    console.log("se vuoi rimuovere il filtro di una categoria devi usare lo switch");
  }


  getFilteredItems(){
    this.itemsFiltrati = [];
    this.superService.getItemList().then((res: Item[]) => {
      for(let item of res){
        for(let filtro of this.filtriInUso){
          if(filtro.tipo === 'categoria' && filtro.id === item.category){
            if(!this.eliminaOggettiDuplicati(item)) {
              this.itemsFiltrati.push(item);
            }
          } else {
            if(filtro.tipo === 'utente' && filtro.id === item.owner){
              if(!this.eliminaOggettiDuplicati(item)) {
                this.itemsFiltrati.push(item);
              }
            } else if (filtro.id === item.id && filtro.nome === item.name) {
              if(!this.eliminaOggettiDuplicati(item)) {
                this.itemsFiltrati.push(item);
              }
            }
          }
        }
      }
    }).catch((error) => {
      window.alert("errore di chiamata API" + error);
      this.returnHome;
    })
  }

  eliminaOggettiDuplicati(item: Item): boolean{
    let variabile = false;
    console.log('Entrato in elimina duplicati')
    for(let i=0; i<this.itemsFiltrati.length; i++){
      if(this.itemsFiltrati[i].id === item.id && this.itemsFiltrati[i].name === item.name) {
        variabile = true;
      }
    }
    return variabile;
  }


}
