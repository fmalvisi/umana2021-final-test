import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CategoryService, ItemsService } from 'src/app/core/api/generated';


@Component({
  selector: 'app-categories-add',
  templateUrl: './categories-add.component.html',
  styleUrls: ['./categories-add.component.scss']
})
export class CategoriesAddComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
