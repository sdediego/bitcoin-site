import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

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
  url: string;
  error: string;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    steemconnect.init({
      baseURL: 'https://steemconnect.com',
      app:'bitcoin-bitacora',
      callbackURL: 'http://localhost:4200'
    });

    this.url = steemconnect.getLoginURL();

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
    this.authService.login(this.user).subscribe(
      user => {
        loginForm.reset();
        console.log(user);
        this.router.navigate(['']);
      },
      error => {
        this.error = error.message;
        console.log(this.error);
      });
  }

}
