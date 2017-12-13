import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Rx';


@Injectable()
export class BitstampService {

  private baseBitstampUrl = 'https://www.bitstamp.net/api';
  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(private http: Http) {}

  private handleError(error: Response | any): Observable<string> {
    return Observable.throw(error.json().message);
  }

  public getTransactions(): Observable<any> {
    return this.http.get(`${this.baseBitstampUrl}/transactions?time=minute`)
      .map(res => res.json())
      .catch(error => this.handleError(error));
  }

  public getOrderBook(): Observable<any> {
    return this.http.get(`${this.baseBitstampUrl}/order_book`)
      .map(res => res.json())
      .catch(error => this.handleError(error));
  }

}
