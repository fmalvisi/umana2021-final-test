import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/core/api/generated';
import { Category } from 'src/app/core/api/generated';
import { NgForm } from '@angular/forms';
//import { NgModel } from '@angular/forms';

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
  argomento il form contente gli <input>
  */
  add(formadd: NgForm){
    /*
    creo delle variabili al cui interno passo il valore inserito dall'utente
    nei campi <input> del template
    */
    /*
    creo la variabile "name" pari al valore ("value") dell'elemento con
    attributo name pari a "name", contenuto nel form con id #formadd
    */
    var name = formadd.controls['name'].value;
    var description = formadd.controls['description'].value;

    var test = (<HTMLInputElement>document.getElementById("add-categ-name")).value;
    var test2 = "il valore della variabile test è: " + test;
    console.log(test2);

    /*
    creo una variabile di tipo Category; l'interfaccia Category è presente nel
    file app/core/api/generated/model/category.ts
    */
    var category : Category = {
      id : null,  //per fare in modo che venga automaticamente inserito dall'app
      name : name,  //"name" di Category è pari al valore della variabile "name" sopra
      description : description
    }
    var category2 = "il valore della variabile category è: " + category;
    console.log(category2);

    //validazione dei campi prima dall'invio dei dati al database
    /*
    se i campi <imput> di "name" e "description" non sono vuoti, aka se l'utente
    ha inserito qualcosa all'interno dei campi...
    */
    if((name != "") && (description != "")) {
      /*
      inserisce la nuova categoria all'interno del file db.json, il nostro database
      categoryService accede alla libreria CategoryService, al cui interno si trova
      createCategory, dichiarato nel file app/generated/api/category.service.ts,
      che crea una nuova categoria nel file db.json usando i dati contenuti
      all'interno della variabile "category" definita sopra
      */
      this.categoryService
        .createCategory(category)
        .subscribe(category => console.log('Nuova categoria:', category));

    }//fine if

  } // fine add()




  NicoAdd() {
    // var fakeCat: Category = {
    //   id: 4,
    //   name: 'Camera',
    //   description: 'cose per la camera',
    // };
    // this.categoryService
    //   .createCategory(fakeCat)
    //   .subscribe(items => console.log('Nome:', items));    // this.categoryService
        //   .createCategory(fakeCat)
        //   .subscribe(items => console.log('Nome:', items));
    // this.categoryService.getCategories().subscribe(itemsObj => {
    //   this.newCat = itemsObj;
    // });
  }

}
