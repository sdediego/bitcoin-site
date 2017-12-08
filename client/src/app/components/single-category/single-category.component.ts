import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Rx';

import { IUser } from './../../shared/interfaces/user.interface';
import { ICategory } from './../../shared/interfaces/category.interface';
import { IThread } from './../../shared/interfaces/thread.interface';
import { AuthService } from './../../shared/services/auth.service';
import { ThreadService } from './../../shared/services/thread.service';
import { environment } from './../../../environments/environment';


@Component({
  selector: 'app-single-category',
  templateUrl: './single-category.component.html',
  styleUrls: ['./single-category.component.css']
})
export class SingleCategoryComponent implements OnInit {

  public user: IUser;
  public category: ICategory;
  public threads: Array<IThread>;
  public error: string;

  constructor(
    private authService: AuthService,
    private threadService: ThreadService,
    private router: ActivatedRoute
  ) {
    this.user = this.authService.getUser();
    this.authService.getLoginEventEmitter().subscribe(user => {
      this.user = user;
    });
  }

  public ngOnInit(): void {
    this.router.params.subscribe(params => {
      this.category = params['category'];
    });

    this.threadService.getSingleCategory(this.category).subscribe(
      threads => {
        console.log(threads);
        this.threads = threads;
      },
      error => {
        this.error = error.message;
        console.log(this.error);
      });
  }

}
