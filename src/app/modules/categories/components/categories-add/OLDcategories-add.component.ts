import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/core/api/generated';
import { Category } from 'src/app/core/api/generated';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories-add',
  templateUrl: './categories-add.component.html',
  styleUrls: ['./categories-add.component.scss'],
})
export class CategoriesAddComponent implements OnInit {
  constructor(
    private categoryService: CategoryService,
    private router: Router,
  ) {}

  ngOnInit(): void {}


  onSubmit(formadd: NgForm) {
    var name = formadd.controls['name'].value;
    var description = formadd.controls['description'].value;

    var category: Category = {
      id: null, //per fare in modo che venga automaticamente inserito dall'app
      name: name, //"name" di Category è pari al valore della variabile "name" sopra
      description: description, //idem name
    };

    if (name != '' && description != '') {
      this.categoryService
        .createCategory(category)
        .subscribe(category => console.log('Nuova categoria:', category));
    } // fine if
  } // fine onSubmit()

  goBack(): void {
    this.router.navigate(['categories']);
  }

  //controllo che non esista già una categoria con lo stesso nome
  name = '';
  controllo: boolean = true;

  testNome(formadd: NgForm) {
    var nomecat = formadd.controls['name'].value.toLowerCase();

    this.categoryService.getCategories().subscribe(categories => {
      for (const item of categories) {
        this.name = item.name;
        function doesItMatch() {
          return nomecat === item.name.toLowerCase();
        }
        var match = [item.name.toLowerCase()].some(doesItMatch);

        if (match == true) {
          const element: HTMLElement = document.getElementById('nameMatch') as HTMLElement;
          element.style.display = 'block';
          var button = <HTMLButtonElement>document.getElementById('button');
          button.disabled = true;
        } // fine if
      } // fine for
    });
  } // fine testNome()
}
