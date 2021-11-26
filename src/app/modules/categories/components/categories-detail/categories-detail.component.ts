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
  name = '';
  description = '';
  items = '';
  @Input() categoryName: number | null = 0;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  categoryItems: any = [];
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

  edit() {
    console.log('add');
    // var fakeCat: Category = {
    //   id: 4,
    //   name: 'Camera',
    //   description: 'cose per la camera',
    // };
    // this.categoryService
    //   .createCategory(fakeCat)
    //   .subscribe(items => console.log('Nome:', items));
    // this.categoryService.getCategories().subscribe(itemsObj => {
    //   this.newCat = itemsObj;
    // });
    //   var updateCat: Category = {
    //     id: 1,
    //     name: 'Casa',
    //     description: 'cose per la casaaaa',
    //   };
    //   this.categoryService.updateCategory(
    //     updateCat.id,
    //     updateCat.name,
    //     updateCat.description,
    //   );
  }
}
