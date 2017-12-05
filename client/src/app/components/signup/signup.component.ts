import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { IUser } from './../../shared/interfaces/user.interface';
import { AuthService } from './../../shared/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  user: IUser = {
    username: "",
    email: "",
    password:""
  };
  error: string;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}

  onSubmitSignup(signupForm: NgForm): void {
    this.authService.signup(this.user).subscribe(
      user => {
        signupForm.reset();
        console.log(user);
        this.router.navigate(['']);
      },
      error => {
        this.error = error.message;
        console.log(this.error);
      });
  }

}
