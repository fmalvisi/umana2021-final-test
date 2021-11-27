import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/core/api/generated';
import { CategoryDataService } from '../../service/category-data.service';

@Component({
  selector: 'app-categories-edit',
  templateUrl: './categories-edit.component.html',
  styleUrls: ['./categories-edit.component.scss'],
})
export class CategoriesEditComponent implements OnInit {
  name: Array<string> = [];
  description = '';
  baseURL: string;

  selectedMessage: any;

  private localURL = 'http://localhost:3000/category';

  constructor(
    private categoryService: CategoryService,
    private categoryDataService: CategoryDataService,
  ) {
    this.baseURL = this.localURL;
  }

  ngOnInit(): void {
    this.categoryDataService.currentMessage.subscribe(
      message => (this.selectedMessage = message),
    );

    this.categoryService.getCategories().subscribe(cats => {
      for (const item of cats) {
        this.name.push(item.name);
        this.description = item.description;
      }
    });
  }

  delete(): void {
    console.log('delete');
    console.log(this.selectedMessage);
  }
  // editColor() {
  //   if (!!this.color) {
  //     this.router.navigate(['/color', this.color.id]);
  //   }
  // }
}
