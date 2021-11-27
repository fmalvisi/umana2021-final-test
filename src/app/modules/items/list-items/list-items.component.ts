import { Component, OnInit } from '@angular/core'; 
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { SuperItemService } from 'src/app/core/services/superItemService';
import { Item } from '../../../core/api/generated';
 

@Component({
  selector: 'app-list-items',
  templateUrl: './list-items.component.html',
  styleUrls: ['./list-items.component.scss']
})
export class ListItemsComponent implements OnInit {
  
  message: string|null = null;
  items:Item[] = [];
  item? : Item;
  itemProva$?: Observable<Item>;
  itemProva2$ = of(true);
  mostra = true;
  
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
}
