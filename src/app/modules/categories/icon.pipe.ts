import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'icon'
})
export class IconPipe implements PipeTransform {

  transform(value: any): any {

    //seleziono tutti gli elementi con classe "icon"
    var elements = document.getElementsByClassName('icon');
    //var test = "fa-address-book";
    var favicons:string[] = new Array("fa-address-book","fa-bank", "bell", "cab");

    for (let i = 0; i < elements.length; i++) {
      const element = elements[i] as HTMLElement;
      //element.style.color = "red";
      //element.innerHTML = '<i class="fas fa-address-book"></i>';
      //element.innerHTML = '<i class="fas {{favicon}}"></i>';
      //element.innerHTML = '<i class="">{{favicon}}</i>'; lo mostra ma non interpola
      //element.innerHTML = '<i class="fas '+ test +'"></i>';
      element.innerHTML = '<i class="fas '+ favicons[i] +'"></i>';
    }

    /* se il value passato alla pipe (aka l'id della categoria) è pari a 1 */
    if (value === 1) {
      //var icon = element.innerHTML = '<i class="fas fa-address-book"></i>';
      //return icon;
      //const element: HTMLElement = document.getElementById('test1') as HTMLElement
      //var icon = element.innerHTML = '<i class="fas fa-address-book"></i>';
      //return icon;
    }
    if (value === 3) {
      //const element: HTMLElement = document.getElementById('test2') as HTMLElement
      //var icon = element.innerHTML = '<i class="fas fa-bank"></i>';
      //return icon;
   } else {
      return "La pipe NON funziona!"
    } //fine condizione

  }// fine transform

}// fine classe
