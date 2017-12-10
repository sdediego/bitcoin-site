import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable } from 'rxjs/Rx';
import { IntervalObservable } from "rxjs/observable/IntervalObservable";

import { IUser } from './../../shared/interfaces/user.interface';
import { AuthService } from './../../shared/services/auth.service';
import { CoindeskService } from './../../shared/services/coindesk.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

  public user: IUser;
  public alive: boolean = true;
  public btcPrice: number;
  public interval: number;
  public error: string;

  constructor(
    private authService: AuthService,
    private coindeskService: CoindeskService
  ) {
    this.user = this.authService.getUser();
    this.authService.getLoginEventEmitter().subscribe(user => {
      this.user = user;
    });
  }

  public ngOnInit(): void {
    this.getBtcPrice();

    IntervalObservable.create(60 * 1000)
      .takeWhile(() => this.alive)
      .subscribe(() => {
        this.getBtcPrice();
      });
  }

  public ngOnDestroy(): void {
    this.alive = false;
  }

  private getBtcPrice(): void {
    this.coindeskService.getCurrentBtcPrice().subscribe(
      response => {
        this.btcPrice = response['bpi']['USD']['rate'].split('.')[0];
      },
      error => {
        this.error = error.message;
      });
  }

  public logout(): void {
    if (typeof(this.user) !== 'undefined') {
      this.authService.logout().subscribe();
    }
  }

}
