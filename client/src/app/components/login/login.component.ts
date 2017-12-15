import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

//import * as steemconnect from './../../../../node_modules/steemconnect';

import { IUser } from './../../shared/interfaces/user.interface';
import { AuthService } from './../../shared/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user: IUser = { username: "", password:"" };
  public urlSteemit: string;
  public returnUrl: string;
  public error: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  public ngOnInit(): void {
    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/';
  }

  public onSubmitLogin(loginForm: NgForm): void {
    if (this.user.username != '' && this.user.password != '') {
      this.authService.login(this.user).subscribe(
        user => {
          loginForm.reset();
          this.router.navigateByUrl(this.returnUrl);
        },
        error => {
          this.error = error.message;
        });
    } else {
      this.error = 'Please provide username and password';
    }
  }

}
