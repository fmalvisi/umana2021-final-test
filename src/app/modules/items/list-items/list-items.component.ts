import { Component, OnInit } from '@angular/core'; 
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

  oggettoProva:Item = {
    "id": 4,
    "name": "Mouse",
    "description": "Usato",
    "price": 30,
    "category": null,
    "owner": null
  };

  constructor(
    private superService : SuperItemService,
    private itemsService : ItemsService,
    ) {}

  ngOnInit(): void {     
     this.items = this.superService.getItemList();
     console.log(this.items);
  }

  

}
