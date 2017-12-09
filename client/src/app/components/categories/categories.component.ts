import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Rx';

import { IUser } from './../../shared/interfaces/user.interface';
import { ICategory } from './../../shared/interfaces/category.interface';
import { AuthService } from './../../shared/services/auth.service';
import { ThreadService } from './../../shared/services/thread.service';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  public user: IUser;
  public categories: Array<ICategory>;
  public error: string;

  constructor(
    private authService: AuthService,
    private threadService: ThreadService,
  ) {
    this.user = this.authService.getUser();
    this.authService.getLoginEventEmitter().subscribe(user => {
      this.user = user;
    });
  }

  public ngOnInit(): void {
    this.threadService.getCategories().subscribe(
      categories => {
        this.categories = categories;
      },
      error => {
        this.error = error.message;
      });
  }

}
