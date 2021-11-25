import { Component, OnInit } from '@angular/core'; 
import { CategoryService, ItemsService, UsersService } from '../../../core/api/generated';
 

@Component({
  selector: 'app-list-items',
  templateUrl: './list-items.component.html',
  styleUrls: ['./list-items.component.scss']
})
export class ListItemsComponent implements OnInit {
  
  message: string|null = null;
  items:any = [];

  oggettoProva = {
    "id": 2,
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
      
     this.itemService.getItems().subscribe(itemsObj => {this.items = itemsObj});  
  }

}
