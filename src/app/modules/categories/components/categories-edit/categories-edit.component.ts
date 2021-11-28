import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  localId: any = window.localStorage.getItem('category');

  paramId = 0;

  constructor(
    private categoryService: CategoryService,
    private categoryDataService: CategoryDataService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    // Recupero ID Categoria tramite ParamMap
    this.route.paramMap.subscribe(param => {
      var paramId = param.get('id');
      this.paramId = Number(paramId);
    });
    //  Recupero ID Categoria tramite Service
    this.categoryDataService.currentMessage.subscribe(
      message => (this.catId = message),
    );

    //  Assegnazione ID tramite localStorage e assegnazione nome categorie
    this.categoryService.getCategories().subscribe(cats => {
      // var newLocalId = this.localId - 1;
      console.log("ciao", this.paramId)
      this.catName = (cats[this.paramId]).name;
    });
  }

  delete(): void {
    console.log('delete');
  }

  editCat(): void {
    console.log('edit');
    //   this.categoryService
    //     .updateCategory()
    //     .subscribe(items => console.log('Nome:', items));
    // }
  }
}
