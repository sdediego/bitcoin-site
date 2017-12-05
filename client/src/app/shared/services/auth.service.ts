import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import

import { IUser } from './../interfaces/user.interface';
import { environment } from './../../../environments/environment';

@Injectable()
export class AuthService {

  private user: IUser;
  private baseUrl = `${environment.apiUrl}/auth`;
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private options = new RequestOptions({ headers: this.headers, withCredentials: true });
  private loginEvent: EventEmitter<object> = new EventEmitter();

  constructor(private http: Http) {
    this.isLoggedin().subscribe();
  }

  private handleError(error: Response | any): Observable<string> {
    return Observable.throw(error.json().message);
  }

  private handleUser(user: IUser): IUser {
    this.user = user;
    this.loginEvent.emit(this.user);
    return this.user;
  }

  signup(user: IUser): Observable<IUser> {
    return this.http.post(`${this.baseUrl}/signup`, JSON.stringify(user), this.options)
    .map(res => res.json())
    .map(user => this.handleUser(user))
    .catch(error => this.handleError(error));
  }

  login(user: IUser): Observable<IUser> {
    return this.http.post(`${this.baseUrl}/login`, JSON.stringify(user), this.options)
      .map(res => res.json())
      .map(user => this.handleUser(user))
      .catch(error => this.handleError(error));
  }

  logout(): Observable<string> {
    return this.http.get(`${this.baseUrl}/logout`, this.options)
      .map(res => res.json())
      .map(user => this.handleUser(user))
      .catch(error => this.handleError(error));
  }

  isLoggedin(): Observable<IUser> {
    return this.http.get(`${this.baseUrl}/loggedin`, this.options)
      .map(res => res.json())
      .map(user => this.handleUser(user))
      .catch(error => this.handleError(error));
  }

}
