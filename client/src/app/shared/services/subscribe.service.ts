import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Rx';

import { IUser } from './../interfaces/user.interface';
import { environment } from './../../../environments/environment';


@Injectable()
export class SubscribeService {

  private user: IUser;
  private baseUrl = `${environment.apiUrl}`;
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private options = new RequestOptions({ headers: this.headers, withCredentials: true });

  constructor(private http: Http) {}

  private handleError(error: Response | any): Observable<string> {
    return Observable.throw(error.json().message);
  }

  public sendSubscritption(email): Observable<any> {
    return this.http.post(`${this.baseUrl}/subscription`, JSON.stringify(email), this.options)
      .map((res: Response) => res.json())
      .catch((error: Response | any) => this.handleError(error));
  }

}
