import { Component, Input, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/core/api/generated';
import { Category } from 'src/app/core/api/generated';

@Component({
  selector: 'app-categories-edit',
  templateUrl: './categories-edit.component.html',
  styleUrls: ['./categories-edit.component.scss'],
})
export class CategoriesEditComponent implements OnInit {
  @Input() color: Category | undefined;

  name: Array<string> = [];
  description = '';
  baseURL: string;

  private localURL = 'http://localhost:3000/category';

  constructor(private categoryService: CategoryService) {
    this.baseURL = this.localURL;
  }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(cats => {
      for (const item of cats) {
        this.name.push(item.name);
        this.description = item.description;
      }
    });
  }

  delete(): void {
    console.log('delete');
  }
  // editColor() {
  //   if (!!this.color) {
  //     this.router.navigate(['/color', this.color.id]);
  //   }
  // }
}
