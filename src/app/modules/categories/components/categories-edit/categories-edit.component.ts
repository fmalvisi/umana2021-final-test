import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    private router: Router,
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
  exist = false;
  editCat(name: string, descr: string): void {
    this.categoryService.getCategories().subscribe(cats => {
      for (let i = 0; i < cats.length; i++) {
        if (cats[i].name == name && name != this.catName) {
          this.exist = true;
        }
      }
      var validInput = /^([a-zA-Z]+\s)*[a-zA-Z]+$/;
      if (
        name.length > 3 &&
        name.match(validInput) &&
        name.length <= 25 &&
        descr.length > 5 &&
        descr.match(validInput) &&
        descr.length <= 40 &&
        this.exist == false
      ) {
        this.catt.name = name;
        this.catt.description = descr;
        this.categoryService
          .updateCategory(this.paramId, this.catt)
          .subscribe();
        this.router.navigate(['categories']);
      } else if (name.length < 3) {
        document.getElementById('error')!.innerHTML =
          'Nome categoria troppo corto.';
      } else if (name.length > 25) {
        document.getElementById('error')!.innerHTML =
          'Nome categoria troppo lungo.';
      } else if (!name.match(validInput)) {
        document.getElementById('error')!.innerHTML =
          'Caratteri nome non validi.';
      } else if (descr.length < 5) {
        document.getElementById('error')!.innerHTML =
          'Descrizione categoria troppo corta.';
      } else if (descr.length > 40) {
        document.getElementById('error')!.innerHTML =
          'Descrizione categoria troppo lunga.';
      } else if (!descr.match(validInput)) {
        document.getElementById('error')!.innerHTML =
          'Caratteri categoria non validi.';
      } else if (this.exist) {
        document.getElementById('error')!.innerHTML =
          'Categoria già esistente.';
      }
    });
  }

  // Ritorna alla pagina precedente
  goBack(): void {
    this.router.navigate(['categories']);
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
