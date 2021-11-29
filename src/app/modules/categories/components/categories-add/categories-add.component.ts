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

  controlloGlobal: boolean = true;

  onSubmit(formadd: NgForm) {
    var name = formadd.controls['name'].value;
    var description = formadd.controls['description'].value;

    var category: Category = {
      id: null, //per fare in modo che venga automaticamente inserito dall'app
      name: name, //"name" di Category è pari al valore della variabile "name" sopra
      description: description,
    };

    var nomecat = name.toLowerCase();

    this.categoryService.getCategories().subscribe(categories => {
      console.log('la categories è: ', categories);
      var test = categories.filter(c => {
        return nomecat === c.name.toLowerCase();
      }); // fine test
      console.log('test è uguale a: ', test);
      if (test.length > 0) {
        console.log('è stata trovata una corrispondenza');
        const element: HTMLElement = document.getElementById(
          'nameMatch',
        ) as HTMLElement;
        element.style.display = 'block';
        var button = <HTMLButtonElement>document.getElementById('button');
        button.disabled = true;
      } else {
        this.categoryService
          .createCategory(category)
          .subscribe(category => console.log('Nuova categoria:', category));
      } // fine if...else
    }); // fine subscribe()
  } // fine onSubmit()

  // per tornare alla pagina precedente al click del bottone
  goBack(): void {
    this.router.navigate(['categories']);
  }
}
