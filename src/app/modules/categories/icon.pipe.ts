import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'icon'
})
export class IconPipe implements PipeTransform {

  transform(value: any): any {

    //creo un array contenente la parte finale del nome dei file PNG in /assets
    var icons:string[] = new Array("cutlery", "home", "star", "brush", "earth");

    //(!) se non trova icone, ritorna il file immagine "icon-undefined.png"
    //alternativa: loop nell'array

    //ritorna il valore di src dell'elemento <img> dove è presente la pipe
    return "app/modules/categories/assets/icon-"+ icons[value] +".png";



    //seleziono tutti gli elementi con classe "icon"
    // var elements = document.getElementsByClassName('icon');
    //var test = "fa-address-book";
    //var favicons:string[] = new Array("fa-address-book","fa-bank", "fa-bell", "fa-cab");

    // for (let i = 0; i < elements.length; i++) {
    //   const element = elements[i] as HTMLElement;
    //   //element.style.color = "red";
    //   //element.innerHTML = '<i class="fas fa-address-book"></i>';
    //   //element.innerHTML = '<i class="fas {{favicon}}"></i>';
    //   //element.innerHTML = '<i class="">{{favicon}}</i>'; lo mostra ma non interpola
    //   //element.innerHTML = '<i class="fas '+ test +'"></i>';
    //   //element.innerHTML = '<i class="fas '+ favicons[i] +'"></i>';
    //
    //   element.innerHTML = '<img src="app/modules/categories/assets/icon-'+ icons[i] +'.png" width="16" height="16">';
    //
    // }

  }// fine transform

}// fine classe
