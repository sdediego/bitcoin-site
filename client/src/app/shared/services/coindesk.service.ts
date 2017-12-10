import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Rx';


@Injectable()
export class CoindeskService {

  private baseCoindeskUrl = 'https://api.coindesk.com/v1/bpi';
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private //options = new RequestOptions({ headers: this.headers, withCredentials: true });
  private priceEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor(private http: Http) {}

  private handleError(error: Response | any): Observable<string> {
    return Observable.throw(error.json().message);
  }

  public getCurrentBtcPrice(): Observable<string> {
    return this.http.get(`${this.baseCoindeskUrl}/currentprice.json`)
      .map(res => res.json())
      .catch(error => this.handleError(error));
  }

}