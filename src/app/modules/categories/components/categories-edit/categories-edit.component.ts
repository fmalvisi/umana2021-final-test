import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/core/api/generated';
import { CategoryService } from 'src/app/core/api/generated';
import { CategoryDataService } from '../../service/category-data.service';

@Component({
  selector: 'app-categories-edit',
  templateUrl: './categories-edit.component.html',
  styleUrls: ['./categories-edit.component.scss'],
})
export class CategoriesEditComponent implements OnInit {
  // catId = 0;
  catName = '';
  catDescr = '';
  localId: any = window.localStorage.getItem('category');

  paramId = 0;

  catt: Category = {
    id: null,
    name: '',
    description: '',
  };

  constructor(
    private categoryService: CategoryService,
    private categoryDataService: CategoryDataService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    // Recupero ID Categoria tramite ParamMap e ID
    this.route.paramMap.subscribe(param => {
      var paramId = param.get('id');
      this.paramId = Number(paramId);
      //  funzione assegnazione dati
      this.catsData();
    });
  }

  //  Recupero ID Categoria tramite Service
  // this.categoryDataService.currentMessage.subscribe(
  //   message => (this.catId = message),
  // );

  //  Assegnazione ID tramite URL e assegnazione nome categorie
  // this.categoryService.getCategories().subscribe(cats => {
  // var newLocalId = this.paramId - 1;
  // this.catName = cats[newLocalId].name;
  // });

  // Funzione per il popolare l'array con le modifiche e fare l'update del json
  editCat(name: string, descr: string): void {
    console.log('nome: ', name);
    this.catt.name = name;
    this.catt.description = descr;
    this.categoryService
      .updateCategory(this.paramId, this.catt)
      .subscribe(cats => console.log('Categoria aggiornata:', cats));
  }

  // Funzione per l'assegnazione di nome e descrizione della categoria
  catsData(): void {
    this.categoryService.getCategories().subscribe(cats => {
      var newLocalId = this.paramId - 1;
      return (
        (this.catName = cats[newLocalId].name),
        (this.catDescr = cats[newLocalId].description)
      );
    });
  }
}
