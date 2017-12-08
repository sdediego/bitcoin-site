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
    if (this.user.username != '' && this.user.email != '' && this.user.password != '') {
      this.authService.signup(this.user).subscribe(
        user => {
          signupForm.reset();
          console.log(user);
          this.router.navigate(['']);
          // Push service with firebase anouncing email checking
        },
        error => {
          this.error = error.message;
          console.log(this.error);
        });
    } else {
      console.log('Please provide username, email and password');
      this.error = 'Please provide username, email and password';
    }
  }

}
