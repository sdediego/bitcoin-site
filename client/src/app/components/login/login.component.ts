import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { IUser } from './../../shared/interfaces/user.interface';
import { AuthService } from './../../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: IUser;
  error: string;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}

  onSubmitLogin(loginForm) {
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
