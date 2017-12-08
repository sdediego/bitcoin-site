import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Rx';

import { IUser } from './../interfaces/user.interface';
import { ICategory } from './../interfaces/category.interface';
import { IThread } from './../interfaces/thread.interface';
import { environment } from './../../../environments/environment';


@Injectable()
export class ThreadService {

  private user: IUser;
  private baseUrl = `${environment.apiUrl}`;
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private options = new RequestOptions({ headers: this.headers, withCredentials: true });

  constructor(private http: Http) {}

  private handleError(error: Response | any): Observable<string> {
    return Observable.throw(error.json().message);
  }

  public getCategories(): Observable<Array<ICategory>> {
    return this.http.get(`${this.baseUrl}/categories`, this.options)
      .map((res: Response) => res.json())
      .catch((error: Response | any) => this.handleError(error));
  }

  public getSingleCategory(category: string): Observable<Array<IThread>> {
    return this.http.get(`${this.baseUrl}/categories/${category}`, this.options)
      .map((res: Response) => res.json())
      .catch((error: Response | any) => this.handleError(error));
  }

  public getThread(threadId: string): Observable<IThread | any> {
    return this.http.get(`${this.baseUrl}/thread/${threadId}`, this.option)
      .map((res: Response) => res.json())
      .catch((error: Response | any) => this.handleError(error));
  }

}
