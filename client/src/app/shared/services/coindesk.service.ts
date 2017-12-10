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

  public getHistoricalBtcPrice(dates): Observable<string> {
    let param = null;
    if (dates) {
      param = "?start="+dates.start_date.toISOString().substr(0,10)+"&end="+dates.end_date.toISOString().substr(0,10);
    }
    return this.http.get(`${this.baseCoindeskUrl}/historical/close.json/${param}`)
      .map(res => res.json())
      .catch(error => this.handleError(error));
  }

}
