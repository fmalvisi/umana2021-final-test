import { Component, OnInit } from '@angular/core'; 
import { Router } from '@angular/router';
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
  filtriInUso: any[] = [{tipo: '', id: 0, nome:''}];
  
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

  returnHome() {
    this.router.navigate(['/']);
    
  }

  modify(index: number){
    this.mostra = false;
  }

  details(index: number){
    this.mostra = false;
  }

  deleteItem(index: number){
    if(index != null || index != 0){
      this.superService.deleteItem(index).subscribe(() =>{
        console.log('oggetto eliminato!')
      })
    }
    this.getItems();
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

  }

  rimuoviFiltri(){
    this.filtriInUso = [];
  }

  chosenFilter(type: string, idF: number, name: string, event?: any){
    let tmpArray = {tipo: type, id: idF, nome: name};
    console.log(event === undefined);
    if(event === undefined || event.target.checked === true){
      this.filtriInUso.push(tmpArray);
    // } else if(event !== undefined || event.target.cheched === false){
    //   for(let i=0; i<this.filtriInUso.length; i++){
    //     if(this.filtriInUso[i] === tmpArray){
    //       this.filtriInUso.slice(i, 1);
    //     }
    //   }
    }
    
    console.log("filtri in uso", this.filtriInUso)
  }
}
