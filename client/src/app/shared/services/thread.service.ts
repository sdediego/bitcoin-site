import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Rx';

import { IUser } from './../interfaces/user.interface';
import { ICategory } from './../interfaces/category.interface';
import { IThread } from './../interfaces/thread.interface';
import { IReply } from './../interfaces/reply.interface';
import { environment } from './../../../environments/environment';


@Injectable()
export class ThreadService {

  private user: IUser;
  private baseUrl = `${environment.apiUrl}`;
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private options = new RequestOptions({ headers: this.headers, withCredentials: true });
  private replyEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor(private http: Http) {}

  public getReplyEventEmitter(): EventEmitter<any> {
    return this.replyEvent;
  }

  private emitReplyEvent(reply: IReply): IReply {
    this.replyEvent.emit(reply);
    return reply;
  }

  private handleError(error: Response | any): Observable<string> {
    return Observable.throw(error.json().message);
  }

  public getCategories(): Observable<Array<ICategory>> {
    return this.http.get(`${this.baseUrl}/categories`, this.options)
      .map((res: Response) => res.json())
      .catch((error: Response | any) => this.handleError(error));
  }

  public getSingleCategory(category: ICategory | string): Observable<Array<IThread>> {
    return this.http.get(`${this.baseUrl}/categories/${category}`, this.options)
      .map((res: Response) => res.json())
      .catch((error: Response | any) => this.handleError(error));
  }

  public getThread(threadId: IThread | string): Observable<IThread | any> {
    return this.http.get(`${this.baseUrl}/thread/${threadId}`, this.options)
      .map((res: Response) => res.json())
      .catch((error: Response | any) => this.handleError(error));
  }

  public postNewThread(thread: IThread, category: ICategory | string): Observable<IThread | any> {
    return this.http.post(`${this.baseUrl}/thread/new/${category}`, JSON.stringify(thread), this.options)
      .map((res: Response) => res.json())
      .catch((error: Response | any) => this.handleError(error));
  }

  public removeThread(threadId: string): Observable<IThread | any> {
    return this.http.get(`${this.baseUrl}/thread/${threadId}/remove`, this.options)
      .map((res: Response) => res.json())
      .catch((error: Response | any) => this.handleError(error));
  }

  public postNewReply(reply: IReply, threadId: string): Observable<IReply | any> {
    return this.http.post(`${this.baseUrl}/reply/${threadId}`, JSON.stringify(reply), this.options)
      .map((res: Response) => res.json())
      .map((res: Response | any) => this.emitReplyEvent(res.newThread))
      .catch((error: Response | any) => this.handleError(error));
  }

  public removeReply(replyId: string): Observable<IReply | any> {
    return this.http.get(`${this.baseUrl}/reply/remove/${replyId}`, this.options)
      .map((res: Response) => res.json())
      .catch((error: Response | any) => this.handleError(error));
  }

}
