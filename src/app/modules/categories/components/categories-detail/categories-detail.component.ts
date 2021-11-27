import { Component, OnInit, Input } from '@angular/core';
import {
  CategoryService,
  ItemsService,
  Category,
} from 'src/app/core/api/generated';

@Component({
  selector: 'app-categories-detail',
  templateUrl: './categories-detail.component.html',
  styleUrls: ['./categories-detail.component.scss'],
})
export class CategoriesDetailComponent implements OnInit {
  @Input() categoryName: number | null = 0;

  name = '';
  description = '';
  items = '';
  categoryItems: Array<string> = [];
  categoryNames: any = 0;

  newCat: Category[] = [];

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
  }

  ngOnChanges(): void {
    this.itemService.getItems().subscribe(items => {
      for (let i = 0; i < items.length; i++) {
        if (this.categoryName == items[i].category) {
          this.categoryItems.push(items[i].name);
          this.categoryNames = items[i].category;
        }
      }
    });
  }
}
