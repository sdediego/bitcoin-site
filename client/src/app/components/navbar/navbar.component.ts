import { Component, OnInit } from '@angular/core';

import { IUser } from './../../shared/interfaces/user.interface';
import { AuthService } from './../../shared/services/auth.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public user: IUser;
  public error: string;

  constructor(private authService: AuthService) {
    this.user = this.authService.getUser();
    this.authService.getLoginEventEmitter().subscribe(user => {
      this.user = user;
    });
  }

  public ngOnInit(): void {
    this.user = this.authService.getUser();
    this.authService.getLoginEventEmitter().subscribe(user => {
      this.user = user;
    });
  }

  public logout(): void {
    if (typeof(this.user) !== 'undefined') {
      this.authService.logout().subscribe();
    }
  }

}
