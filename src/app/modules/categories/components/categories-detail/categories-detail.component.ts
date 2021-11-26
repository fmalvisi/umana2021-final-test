import { Component, OnInit, Input } from '@angular/core';
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
  @Input() categoryName: number | null = 0;

  categoryN: any = 'Bagno';
  categoryItems: any = [];

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
      for (let i = 0; i < items.length; i++) {
        if (this.categoryN == items[i].category) {
          this.categoryItems.push(items[i].name);
        }
      }
    });
  }
}
