import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Rx';

import { IUser } from './../interfaces/user.interface';
import { environment } from './../../../environments/environment';

@Injectable()
export class AuthService {

  private user: IUser;
  private baseUrl = `${environment.apiUrl}/auth`;
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private options = new RequestOptions({ headers: this.headers, withCredentials: true });
  private loginEvent:

  constructor(private http: Http) {}

  signup(user: IUser): Observable<IUser> {
    return this.http.post(`${this.baseUrl}/signup`, JSON.stringify(user), this.options)
    .map(res => res.json())
    .catch(error => this.handleError(error));
  }

  login(user: IUser): Observable<IUser> {
    return this.http.post(`${this.baseUrl}/login`, JSON.stringify(user), this.options)
      .map(res => res.json())
      .catch(error => this.handleError(error));
  }

  logout() {
    return this.http.get(`${this.baseUrl}/logout`, this.options)
      .map(res => res.json())
      .catch(error => this.handleError(error));
  }

  isAuthenticated(): boolean {
    return this.user !== null && this.user !== undefined;
  }

  private handleError(error: Response | any): Observable<string> {
    return Observable.throw(error.json().message);
  }

}
