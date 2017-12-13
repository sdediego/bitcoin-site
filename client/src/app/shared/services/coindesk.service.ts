import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Rx';


@Injectable()
export class CoindeskService {

  private baseCoindeskUrl = 'https://api.coindesk.com/v1/bpi';
  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(private http: Http) {}

  private handleError(error: Response | any): Observable<string> {
    return Observable.throw(error.json().message);
  }

  public getCurrentBtcPrice(): Observable<string> {
    return this.http.get(`${this.baseCoindeskUrl}/currentprice.json`)
      .map(res => res.json())
      .catch(error => this.handleError(error));
  }

  public getHistoricalBtcPrice(): Observable<string> {
    let today = new Date();
    let interval = '?start=2011-01-01&end=' + today.toISOString().slice(0,10);
    return this.http.get(`${this.baseCoindeskUrl}/historical/close.json${interval}`)
      .map(res => res.json())
      .catch(error => this.handleError(error));
  }

}
