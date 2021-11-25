import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryService, ItemsService, UsersService } from '../../../../core/api/generated';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  message: string|null = null;

  constructor(
    private itemService: ItemsService,
    private categoryService: CategoryService,
    private userService: UsersService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe(params => {
      this.message = params.get('message');
    })

    this.itemService.getItems().subscribe(items => console.log('got items:', items));

    this.categoryService.getCategories().subscribe(cats => console.log('got categories:', cats));

    this.userService.getUsers().subscribe(users => console.log('got users: ', users));

    this.userService.getUser(1).subscribe(user => console.log('got user with id 1: ', user));

  }

}
