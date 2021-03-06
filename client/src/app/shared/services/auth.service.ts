import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Rx';

import { IUser } from './../interfaces/user.interface';
import { environment } from './../../../environments/environment';


@Injectable()
export class AuthService {

  private user: IUser;
  private baseAuthUrl = `${environment.apiUrl}/api/auth`;
  private baseVerifyUrl = `${environment.apiUrl}/api/verification`;
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private options = new RequestOptions({ headers: this.headers, withCredentials: true });
  private loginEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor(private http: Http) {
    this.isLoggedIn().subscribe();
  }

  public getUser(): IUser {
    return this.user;
  }

  public getLoginEventEmitter(): EventEmitter<any> {
    return this.loginEvent;
  }

  private emitLoginEvent(user: IUser): IUser {
    this.user = user;
    this.loginEvent.emit(user);
    console.log(this.user);
    return user;
  }

  private handleError(error: Response | any): Observable<string> {
    return Observable.throw(error.json().message);
  }

  public signup(user: IUser): Observable<IUser | string> {
    return this.http.post(`${this.baseAuthUrl}/signup`, JSON.stringify(user), this.options)
    .map(res => res.json())
    .catch(error => this.handleError(error));
  }

  public verification(token: string): Observable<object> {
    return this.http.get(`${this.baseVerifyUrl}/${token}`, this.options)
      .map(res => res.json())
      .catch(error => this.handleError(error));
  }

  public login(user: IUser): Observable<IUser | string> {
    return this.http.post(`${this.baseAuthUrl}/login`, JSON.stringify(user), this.options)
      .map(res => res.json())
      .map(user => this.emitLoginEvent(user))
      .catch(error => this.handleError(error));
  }

  public logout(): Observable<IUser | string> {
    return this.http.get(`${this.baseAuthUrl}/logout`, this.options)
      .map(res => res.json())
      .map(res => this.emitLoginEvent(res.user))
      .catch(error => this.handleError(error));
  }

  public isLoggedIn(): Observable<IUser | string> {
    return this.http.get(`${this.baseAuthUrl}/loggedin`, this.options)
      .map(res => res.json())
      .map(user => this.emitLoginEvent(user))
      .catch(error => this.handleError(error));
  }

}
