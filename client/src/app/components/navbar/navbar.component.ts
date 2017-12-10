import { Component, OnInit } from '@angular/core';

import { IUser } from './../../shared/interfaces/user.interface';
import { AuthService } from './../../shared/services/auth.service';
import { CoindeskService } from './../../shared/services/coindesk.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public user: IUser;
  public btcPrice: Number;
  public error: string;

  constructor(
    private authService: AuthService,
    private coindeskService: CoindeskService
  ) {
    this.user = this.authService.getUser();
    this.authService.getLoginEventEmitter().subscribe(user => {
      this.user = user;
    });

    setInterval(this.getBtcPrice(), 60 * 1000);
  }

  public ngOnInit(): void {
    this.user = this.authService.getUser();
    this.authService.getLoginEventEmitter().subscribe(user => {
      this.user = user;
    });
  }

  public getBtcPrice(): void {
    this.coindeskService.getCurrentBtcPrice().subscribe(
      response => {
        this.btcPrice = parseInt(response['bpi']['USD']['rate_float']);
        console.log(this.btcPrice);
      },
      error => {
        console.log('Error retrieving data');
        this.error = error.message;
      });
  }

  public logout(): void {
    if (typeof(this.user) !== 'undefined') {
      this.authService.logout().subscribe();
    }
  }

}
