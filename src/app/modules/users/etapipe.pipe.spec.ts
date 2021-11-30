import { from, of } from "rxjs";
import { CustomPipeEta } from "./etapipe.pipe";
import { User, UsersService} from "src/app/core/api/generated";
import { ComponentFixture, TestBed } from "@angular/core/testing";


fdescribe('AggiungiComponent', () => {
   const pipe = new CustomPipeEta();
    let user: User = {
        id : 1,
        name : "andrea",
        surname : "andrea",
        email : "andrea",
        dob : "18-05-1997"
      };
   
    it ('testing pipe', () => {
        let anno =pipe.transform(user);
        expect(anno).toEqual(24);
   })

   it('testing il primo if age should be age--', () => {
       let pipe =new CustomPipeEta;
       let user: User = {
        id : 1,
        name : "andrea",
        surname : "andrea",
        email : "andrea",
        dob : "18-12-1997"
      };
       let mese=pipe.transform(user);
       
       let user2: User = {
        id : 1,
        name : "andrea",
        surname : "andrea",
        email : "andrea",
        dob : "18-05-1997"

      };
      let mese2=pipe.transform(user2);

   })

   it('testing il secondo if age should be age--', () => {
    let pipe =new CustomPipeEta;
    let user: User = {
     id : 1,
     name : "andrea",
     surname : "andrea",
     email : "andrea",
     dob : "31-11-1997"
   };
    let mese=pipe.transform(user);
    
    let user2: User = {
     id : 1,
     name : "andrea",
     surname : "andrea",
     email : "andrea",
     dob : "18-05-1997"

   };
   let mese2=pipe.transform(user2);

})

it('testing il terzo if age should be age++', () => {
    let pipe =new CustomPipeEta;
    let user: User = {
     id : 1,
     name : "andrea",
     surname : "andrea",
     email : "andrea",
     dob : "30-11-1997"
   };
    let mese=pipe.transform(user);
    
    let user2: User = {
     id : 1,
     name : "andrea",
     surname : "andrea",
     email : "andrea",
     dob : "30-05-1997"

   };
   let mese2=pipe.transform(user2);

})

    
  

})