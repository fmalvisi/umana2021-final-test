import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-empty-layout',
  templateUrl: './empty-layout.component.html',
  styleUrls: ['./empty-layout.component.scss'],
})
export class EmptyLayoutComponent implements OnInit {

  year = new Date().getFullYear();

  constructor() {
    console.log('EmptyLayoutComponent constructor');
  }

  ngOnInit(): void {
    console.log('EmptyLayoutComponent ngOnInit');
  }
}
