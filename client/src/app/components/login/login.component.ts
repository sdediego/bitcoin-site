import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import * as steemconnect from './../../../../node_modules/steemconnect';

import { IUser } from './../../shared/interfaces/user.interface';
import { AuthService } from './../../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: IUser = {
    username: "",
    password:""
  };
  urlSteemit: string;
  returnUrl: string;
  error: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    steemconnect.init({
      baseURL: 'https://steemconnect.com',
      app:'bitcoin-bitacora',
      callbackURL: 'http://localhost:4200'
    });

    this.urlSteemit = steemconnect.getLoginURL();

    steemconnect.isAuthenticated((error, result) => {
      if (error) {
        this.error = error;
      } else {
        console.log(`Logged in as: ${result}`);
      }
    });
  }

  onSubmitLogin(loginForm: NgForm): void {
    console.log(this.user);
    if (this.user.username != '' && this.user.password != '') {
      this.authService.login(this.user).subscribe(
        user => {
          loginForm.reset();
          console.log(this.user);
          this.router.navigateByUrl(this.returnUrl);
        },
        error => {
          this.error = error.message;
          console.log(this.error);
        });
    } else {
      console.log('Please provide username and password');
      this.error = 'Please provide username and password';
    }
  }

}
