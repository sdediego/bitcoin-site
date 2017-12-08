import { Component, OnInit } from '@angular/core';

import { IUser } from './../../shared/interfaces/user.interface';
import { AuthService } from './../../shared/services/auth.service';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  user: IUser;
  categories: Array<ICategory>;

  constructor(private authService: AuthService) {}

  ngOnInit() {}

}
