import { Component, OnInit } from '@angular/core';
import { CategoryService, ItemsService } from 'src/app/core/api/generated';

@Component({
  selector: 'app-categories-detail',
  templateUrl: './categories-detail.component.html',
  styleUrls: ['./categories-detail.component.scss'],
})
export class CategoriesDetailComponent implements OnInit {
  name = '';
  description = '';
  items = '';
  constructor(
    private categoryService: CategoryService,
    private itemService: ItemsService,
  ) {}
  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(cats => {
      for (const item of cats) {
        this.name = item.name;
        this.description = item.description;
      }
    });

    this.itemService.getItems().subscribe(items => {
      for (const item of items) {
        console.log(item.name);
        this.items += item.name;
      }
    });
  }
}
