import { Component, OnInit } from '@angular/core'; 
import { Observable, of } from 'rxjs';
import { SuperItemService } from 'src/app/core/services/superItemService';
import { Item, ItemsService } from '../../../core/api/generated';
 

@Component({
  selector: 'app-list-items',
  templateUrl: './list-items.component.html',
  styleUrls: ['./list-items.component.scss']
})
export class ListItemsComponent implements OnInit {
  
  message: string|null = null;
  items:Item[] = [];
  item? : Item;
  fetchedItems :Item[] = [];
  itemProva$?: Observable<Item>;
  itemProva2$ = of(true);
  
  constructor(
    private superService : SuperItemService,
    private itemsService : ItemsService,
    ) {}

  ngOnInit(): void {     
     this.items = this.superService.getItemList();
     console.log(this.items);
     this.superService.getProva(1).subscribe(res => {
       this.item = res;
       console.log("dentro",this.item)
     })
     console.log("fuori",this.item)
     this.itemProva$ = this.superService.getProva(1);
  }

  

}
