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

  /*
  funzione eseguita quando l'utente clicca su <button>, a cui passo come
  argomento la variabile (formadd) contenente l'NgForm del form
  */
  onSubmit(formadd: NgForm) {
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

    var test = (<HTMLInputElement>document.getElementById('add-categ-name'))
      .value;
    console.log('il valore della variabile test è: ' + test);

    /*
    creo una variabile di tipo Category; l'interfaccia Category è presente nel
    file app/core/api/generated/model/category.ts
    */
    var category: Category = {
      id: null, //per fare in modo che venga automaticamente inserito dall'app
      name: name, //"name" di Category è pari al valore della variabile "name" sopra
      description: description, //idem name
    };

    /*
    se i campi <input> non sono vuoti, aka se l'utente ha inserito qualcosa
    all'interno dei campi...
    */
    if (name != '' && description != '') {
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
    } // fine if
  } // fine onSubmit()

  goBack(): void {
    this.router.navigate(['categories']);
  }

  //controllo che non esista già una categoria con lo stesso nome
  name = '';
  controllo: boolean = true;

  testNome(formadd: NgForm) {
    /*
    creo la variabile "nomecat" e la pongo uguale al valore inserito
    nell'<input> con attributo name="name", valore convertito in lowercase
    */
    var nomecat = formadd.controls['name'].value.toLowerCase();

    /*
    uso categoryService per accedere al metodo getCategories(), così da
    recuperare i valori delle categorie contenute nel file db.json
    */
    this.categoryService.getCategories().subscribe(categories => {
      for (const item of categories) {
        /*
            recupero i nomi delle categorie e le pongo in "item", così da avere
            un array dei nomi della categorie
            */
        this.name = item.name;
        //console.log(item.name);

        /*
            creo una funzione che confronta il valore della variabile "nomecat"
            con i nomi dell categorie contenute in "item", convertiti in lowercase
            */
        function doesItMatch() {
          return nomecat === item.name.toLowerCase();
        }
        /*
            creo la variabile "match" pari al risultato del metodo some(), che
            passa la funzione doesItMatch() su tutti gli elementi dell'array
            item.name, i cui nomi sono convertiti in lowercase.
            la variabile match è pari a "true" quando il valore di nomecat è
            pari ad uno dei nomi delle categorie nel db.json
             */
        var match = [item.name.toLowerCase()].some(doesItMatch);
        //console.log("match è: " + match);

        /*
            quando vi è una corrispondeza fra il nome della nuova categoria ed uno
            dei nomi di categoria già presenti nel db, si mostra un messaggio
            di errore contenuto in un <div>, cambiando il suo display da hidden
            (che ha di default) a block.
            Viene inoltre disabilitato il bottone che invia i dati della
            nuova categoria al database.
            */
        if (match == true) {
          //console.log("non puoi usare questo nome");
          // elemento HTML contente il messaggio di errore
          const element: HTMLElement = document.getElementById(
            'nameMatch',
          ) as HTMLElement;
          element.style.display = 'block';

          // bottone che invia i dati del form al database
          var button = <HTMLButtonElement>document.getElementById('button');
          button.disabled = true;
        } // fine if
      } // fine for
    });
  } // fine testNome()
}
