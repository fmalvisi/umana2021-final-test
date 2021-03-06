import { Pipe, PipeTransform } from '@angular/core';
import { User } from 'src/app/core/api/generated';
/*
prendo la data di nascita e return l'eta.
*/
@Pipe({name: 'CustomPipeEta'})

export class CustomPipeEta implements PipeTransform {
    

  transform(user: User) {
    
      const z=user.dob.split("-",3);
      
      let d = z[0];
      let m = z[1];
      let a = z[2]; 
      let date=parseInt(d);
      let mese=parseInt(m);
      let anno=parseInt(a);
      let oggi = new Date;
      let oggidata=oggi.getDate();
      let oggimese=oggi.getMonth();
      let oggianno=oggi.getFullYear();

      var ageyear =oggianno-anno;
      var agemonth =oggimese-mese ;
      var ageday = oggidata-date;
      if (oggidata < date) {
        agemonth--;
        ageday = 30 + ageday;
      }  
      if (agemonth <= 0) {
        ageyear--;
        agemonth = (12 + agemonth);
      }
      

     
      return (ageyear);
  }
}

