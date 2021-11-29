import { Pipe, PipeTransform } from '@angular/core';  
 
 @Pipe ({ 
    name: 'currencyEur' 
 }) 
 
 export class CurrencyEurPipe implements PipeTransform { 
    transform(value: number): string { 
       return new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(value);
    } 
 } 