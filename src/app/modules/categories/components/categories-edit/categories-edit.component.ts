import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/core/api/generated';
import { CategoryDataService } from '../../service/category-data.service';

@Component({
  selector: 'app-categories-edit',
  templateUrl: './categories-edit.component.html',
  styleUrls: ['./categories-edit.component.scss'],
})
export class CategoriesEditComponent implements OnInit {
  catId = 0;
  catName = '';
  catDescr = '';

  constructor(
    private categoryService: CategoryService,
    private categoryDataService: CategoryDataService,
    protected router: Router,
  ) {}

  ngOnInit(): void {
    this.categoryDataService.currentMessage.subscribe(
      message => (this.catId = message),
    );

    this.categoryService.getCategories().subscribe(cats => {
      let newId = this.catId - 1;
      this.catName = cats[newId].name;
    });
  }

  delete(): void {
    console.log('delete');
  }

  editCat() {
    console.log('edit');
    //   this.categoryService
    //     .updateCategory()
    //     .subscribe(items => console.log('Nome:', items));
    // }
  }
}
