import { Component, OnInit } from '@angular/core'; 
import { CategoryService, Item, ItemsService, UsersService } from '../../../core/api/generated';
 

@Component({
  selector: 'app-list-items',
  templateUrl: './list-items.component.html',
  styleUrls: ['./list-items.component.scss']
})
export class ListItemsComponent implements OnInit {
  
  message: string|null = null;
  items:Item[] = [];

  oggettoProva:Item = {
    "id": 4,
    "name": "Mouse",
    "description": "Usato",
    "price": 30,
    "category": null,
    "owner": null
  };

  constructor(
    private itemService: ItemsService,
    private categoryService: CategoryService,
    private userService: UsersService ) { 
    
  }

  ngOnInit(): void {
    //this.itemService.getItems().subscribe(items => console.log('PROVAA:', items));
    this.itemService.createItem(this.oggettoProva).subscribe(items => console.log('PROVAA:', items));
    this.itemService.getItems().subscribe(itemsObj => {this.items = itemsObj});  
      
     
  }

}
