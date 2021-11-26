import { Pipe, PipeTransform } from '@angular/core';
import { User } from 'src/app/core/api/generated';
/*
prendo la data di nascita e return l'eta.
*/
@Pipe({name: 'CustomPipeEta'})

export class CustomPipeEta implements PipeTransform {
    

  transform(user: User) {
      
      const z=user.dob.slice(6,10)
      const a =z.toString();
      const b=parseInt(a);
      let oggi = new Date;
      let anno = oggi.getFullYear();
      let s= anno-b;
      console.log(s);
      return (s);
  }
}

