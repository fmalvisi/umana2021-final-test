import { AfterViewInit, Component, DoCheck, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Item, ItemsService, User, UsersService } from 'src/app/core/api/generated';
@Component({
  selector: 'app-modifica',
  templateUrl: './modifica.component.html',
  styleUrls: ['./modifica.component.scss']
})
export class ModificaComponent implements AfterViewInit {

  
  oggetti:Array<Item>=[]
  id:number=-1;
  utente:User={
    id:null,
    name:'',
    surname:'',
    dob:'',
    email:''
  };
  showForm=false;
  checkform=this.fb.group({
    nome:['',[Validators.required,Validators.pattern(/^[a-zA-Z]*$/)]],
    cognome:['',[Validators.required,Validators.pattern(/^[a-zA-Z]*$/)]],
    dob:['',[Validators.required]],
    email:['',[Validators.required,Validators.pattern(/^[a-zA-Z0-9.]+@{1}[a-zA-Z0-9]+\.{1}[a-zA-Z0-9]{1,4}$/)]]
  })
  gotdate=false;
  dobc:string="placeholder";


  /*formStatus(){
    console.log("il form è falso:" + this.checkform.invalid);
    return this.checkform.invalid;
  }*/


  constructor(private api:UsersService, private route:ActivatedRoute, private chkurl:Router, private fb:FormBuilder, private items:ItemsService) {

    //prova fix dob

    console.log('parto da qui');
    console.log(this.route.data);
    this.route.data.subscribe(data=>{
      console.log("ok ",data);
      this.utente=data.utente;
      this.oggetti=[];
      this.aggiorna();

          //prova fix dob funziona!!!
          this.updateDate();

      for(let oggetto of data.items){
        if(oggetto.owner==this.utente.id || oggetto.owner==null){
          this.oggetti.push(oggetto);
        }
      }
    },error=>{
      console.log(error);
      this.chkurl.navigate(['/users']);
    })
    
  }

  updateDate(){
    try{
      (document.getElementById('dob') as HTMLInputElement).value=this.dobc;
    }catch(error){console.log(error)};
  }

  mostra(){
    return this.showForm;
  }

  Oggetti(){
    return this.oggetti;
  }
  aggiorna(){
    this.showForm=true;
    this.dobc=this.utente.dob.substr(6,4)+"-"+this.utente.dob.substr(3,2)+"-"+this.utente.dob.substr(0,2);
    console.log("dobc è "+this.dobc + " dob è "+this.utente.dob);
    this.checkform.setValue({
      nome:this.utente.name,
      cognome:this.utente.surname,
      dob:this.utente.dob,
      email:this.utente.email
    }
    )
  }

  showInvalid(controllo:boolean){
    return {
      'bg-danger':controllo
    }
  }

  ngAfterViewInit(){
    (document.getElementById('dob') as HTMLInputElement).value=this.dobc;
  }

  setitemsprova=false;

  setItems(oggetto:Item){
    console.log(oggetto);
    if(oggetto.owner==null){
      oggetto.owner=this.utente.id;
    } else {
      oggetto.owner=null;
    }
    console.log('oggetto nel test è' , oggetto);
    this.items.updateItem(oggetto.id!,oggetto).subscribe(()=>{console.log('tutto bene')});
  }

  onsubmit(){
    console.log("provo il submit");
    if(this.checkform.valid){
    let id=this.utente.id;
    let name=(document.getElementById('name') as HTMLInputElement).value;
    let surname=(document.getElementById('surname') as HTMLInputElement).value;
    let dob=(document.getElementById('dob') as HTMLInputElement).value;
    let email=(document.getElementById('email') as HTMLInputElement).value;
    let dobu=dob.substr(8,2)+"-"+dob.substr(5,2)+"-"+dob.substr(0,4);
    console.log('dobu è '+dobu);
    let editUser:User={
      id:id,
      name:name,
      surname:surname,
      dob:dobu,
      email:email
    }
    this.utente=editUser;
    this.api.updateUser(id!,editUser).subscribe();
    //alert('utente aggiornato!');
    ///////////////////////////////////////////////////
    this.vedoNotifica=true;
    this.classenotifica={
      'aggiornato':true
    }
    this.testonotifica="Utente aggiornato!"
    // let notifica=document.getElementById('notifica') as HTMLElement;
    // notifica!.classList.add('bg-success');
    // notifica!.style.fontSize='3rem';
    // notifica.innerHTML='Utente aggiornato!';
    
    setTimeout(()=>{this.vedoNotifica=false},1000);
    ///////////////////////////////////////////////////
  } else {
    console.log('else');
    this.vedoNotifica=true;
    this.classenotifica={
      'pericolo':true,
    };
    this.testonotifica="Campi non validi";
    setTimeout(()=>{this.vedoNotifica=false},1000);
  }
  }


  tinvalid(controllo:boolean):String{
    if (controllo){
      return "campo non valido";
    }
    else {
      return "campo valido";
    }
  }

  distruggiUtente(){
    let posso=true;
    for(let i=0;i<this.oggetti.length;i++){
      if(this.oggetti[i].owner==this.utente.id){
        posso=false;
      }
    }
    if(posso){
    this.api.deleteUser(this.utente.id!).subscribe();
    console.log('else');
    this.vedoNotifica=true;
    this.classenotifica={
      'pericolo':true,
    };
    this.testonotifica="Utente distrutto";
    setTimeout(()=>{this.chkurl.navigate(['/users'])},1000);
    
    }
    else{
      //this.api.deleteUser(this.utente.id!).subscribe();
      console.log('else');
      this.vedoNotifica=true;
      this.classenotifica={
        'pericolo':true,
      };
      this.testonotifica="Rimuovi oggetti prima di distruggere";
      setTimeout(()=>{this.vedoNotifica=false},1000)
    }
  }
  



  // aggiungiItem(){
  //   let placeholder=this.oggetti[0];
  //   placeholder.id=null;
  //   this.items.createItem(placeholder).subscribe(error=>{
  //     console.log("error");
  //   })
  // }


  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  vedoNotifica=false;
  classenotifica={};
  mostraNotifica():any{
    return this.classenotifica;
  }
  testonotifica:string="";
}
