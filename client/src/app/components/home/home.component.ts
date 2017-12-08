import { Component, OnInit } from '@angular/core';

import { IUser } from './../../shared/interfaces/user.interface';
import { AuthService } from './../../shared/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public title: string = 'Bitcoin bitácora';
  public user: IUser;

  constructor(private authService: AuthService) {
    this.user = this.authService.getUser();
    this.authService.getLoginEventEmitter().subscribe(user => {
      this.user = user;
    });
  }

  ngOnInit() {}

  public logout() {
    if (typeof(this.user) !== 'undefined') {
      console.log('Logging out');
      this.authService.logout().subscribe(
        user => {
          console.log(this.user);
        },
        error => {
          //this.error = error.message;
          //console.log(this.error);
        });
    } else {
      console.log('Please provide username and password');
      //this.error = 'Please provide username and password';
    }
  }

}
