import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Rx';

import { IUser } from './../../shared/interfaces/user.interface';
import { ICategory } from './../../shared/interfaces/category.interface';
import { AuthService } from './../../shared/services/auth.service';
import { environment } from './../../../environments/environment';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  public user: IUser;
  public categories: Array<ICategory>;
  public error: string;
  private baseUrl = `${environment.apiUrl}/categories`;
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private options = new RequestOptions({ headers: this.headers, withCredentials: true });

  constructor(private authService: AuthService, private http: Http) {
    this.user = this.authService.getUser();
    this.authService.getLoginEventEmitter().subscribe(user => {
      this.user = user;
    });
  }

  public ngOnInit() {
    this.getCategories().subscribe(
      categories => {
        console.log(categories);
        this.categories = categories;
      },
      error => {
        this.error = error.message;
        console.log(this.error);
      });
  }

  private handleError(error: Response | any): Observable<string> {
    return Observable.throw(error.json().message);
  }
  
  public getCategories(): Observable<Array<ICategory>> {
    return this.http.get(`${this.baseUrl}`, this.options)
      .map(res => res.json())
      .catch(error => this.handleError(error));
  }
}
