import { Component, OnInit } from '@angular/core'; 
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { SuperItemService } from 'src/app/core/services/superItemService';
import { Category, Item, User } from '../../../core/api/generated';
 

@Component({
  selector: 'app-list-items',
  templateUrl: './list-items.component.html',
  styleUrls: ['./list-items.component.scss']
})
export class ListItemsComponent implements OnInit {
  
  message: string|null = null;
  items: Item[] = [];
  categories: Category[] = [];
  users: User[] = [];
  item? : Item;
  // itemProva$?: Observable<Item>;
  // itemProva2$ = of(true);
  mostra = true;
  mostraFiltri = false;
  saveUser: User[] = [];
  searchUser: User[] = [];
  saveItems: Item[] = [];
  searchItems: Item[] = [];
  
  constructor(
    private superService : SuperItemService,
    private router : Router
  ) {}

  ngOnInit(): void {     
    //  this.superService.getProva(1).subscribe(res => {
    //    this.item = res;
    //  })
    //  this.itemProva$ = this.superService.getProva(1);
    this.getItems();    
  }

  modify(index: number){
    this.mostra = false;
    //console.log("indice: ", index) 
  }

  details(index: number){
    this.mostra = false;
   // console.log("indice: ", index) 
  }

  deleteItem(index: number){
    if(index != null || index != 0){
      this.superService.deleteItem(index).subscribe(() =>{
        console.log('oggetto eliminato!')
      })
    }
    this.getItems();
  }
  
  returnHome() {
    this.router.navigate(['/']);
    
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
  
}
