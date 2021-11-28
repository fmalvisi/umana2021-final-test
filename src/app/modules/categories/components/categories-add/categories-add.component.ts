import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/core/api/generated';
import { Category } from 'src/app/core/api/generated';
import { NgForm } from '@angular/forms';
//import { NgModel } from '@angular/forms';
//import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-categories-add',
  templateUrl: './categories-add.component.html',
  styleUrls: ['./categories-add.component.scss']
})
export class CategoriesAddComponent implements OnInit {

  constructor(
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void { }

  /*
  funzione eseguita quando l'utente clicca su <button>, a cui passo come
  argomento la variabile (formadd) contenente l'NgForm del form
  */
  onSubmit(formadd: NgForm){
    /*
    creo delle variabili al cui interno passo il valore inserito dall'utente
    nei campi <input> del template
    */
    /*
    creo la variabile "name" pari al valore ("value") presente nel campo <input>
    che ha attributo name="name"
    */
    var name = formadd.controls['name'].value;
    var description = formadd.controls['description'].value;

    var test = (<HTMLInputElement>document.getElementById("add-categ-name")).value;
    console.log("il valore della variabile test è: " + test);

    /*
    creo una variabile di tipo Category; l'interfaccia Category è presente nel
    file app/core/api/generated/model/category.ts
    */
    var category : Category = {
      id : null,  //per fare in modo che venga automaticamente inserito dall'app
      name : name,  //"name" di Category è pari al valore della variabile "name" sopra
      description : description //idem name
    }


    /*
    se i campi <input> non sono vuoti, aka se l'utente ha inserito qualcosa
    all'interno dei campi...
    */
    if((name != "") && (description != "")) {
      /*
      inserisce la nuova categoria all'interno del file db.json, il nostro database;
      categoryService accede alla libreria CategoryService, al cui interno si trova
      createCategory, dichiarato nel file app/generated/api/category.service.ts,
      che crea una nuova categoria nel file db.json usando i dati contenuti
      all'interno della variabile "category" definita sopra
      */
      this.categoryService
        .createCategory(category)
        .subscribe(category => console.log('Nuova categoria:', category));
    }// fine if

  } // fine onSubmit()



  name = "";
  controllo:boolean = true;

  testNome(formadd: NgForm) {
    var nomecat = formadd.controls['name'].value;

    this.categoryService
      .getCategories()
      .subscribe(
        categories => {
          for (const item of categories) {
            this.name = item.name;
            //console.log(item.name);

            function doesItMatch() {
              return (nomecat === item.name.toLowerCase())
            }
            var match = [item.name.toLowerCase()].some(doesItMatch);
            console.log("match è: " + match);
            if (match == true) {
              //console.log("non puoi usare il nome");
              const element: HTMLElement = document.getElementById('nameMatch') as HTMLElement
              element.style.display = "block";
              var button = (<HTMLButtonElement>document.getElementById("button"));
              button.disabled = true;
            }
          }
        });
  }// fine testNome()


}// fine classe
