import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable()
export class CategoryDataService {
  constructor() {}
  //Using any
  public editDataDetails: any = [];
  public subject = new Subject<any>();
  private messageSource = new BehaviorSubject(this.editDataDetails);

  currentMessage = this.messageSource.asObservable();

  getCatId(id: any) {
    this.messageSource.next(id);
    return window.localStorage.setItem('category', id);
  }
}
