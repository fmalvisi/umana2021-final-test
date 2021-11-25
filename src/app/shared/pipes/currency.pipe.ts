import { Pipe, PipeTransform } from '@angular/core';  
 
 @Pipe ({ 
    name: 'currencyEur' 
 }) 
 
 export class CurrencyEurPipe implements PipeTransform { 
    transform(value: number): string { 
       let eur = "€";  
       return value.toString()+eur;
    } 
 } 