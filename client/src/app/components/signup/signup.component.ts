import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { PushNotificationsService } from 'ng-push';

import { IUser } from './../../shared/interfaces/user.interface';
import { AuthService } from './../../shared/services/auth.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public user: IUser = {
    username: "",
    email: "",
    password:""
  };
  public error: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private pushNotification: PushNotificationsService
  ) {}

  public ngOnInit(): void {}

  public onSubmitSignup(signupForm: NgForm): void {
    if (this.user.username != '' && this.user.email != '' && this.user.password != '') {
      this.authService.signup(this.user).subscribe(
        user => {
          signupForm.reset();
          this.router.navigate(['']);
          // Push service anouncing email checking
          this.pushNotification.create('VERIFICACIÓN', {
            body: "Por favor, haz click en el enlace que hemos enviado a tu cuenta de email para activar tu cuenta.",
            icon: "./../../../assets/bitcoin_logo.png"
          }).subscribe(
            response => console.log(response),
            error => console.log(error)
          );
        },
        error => {
          this.error = error.message;
        });
    } else {
      this.error = 'Please provide username, email and password';
    }
  }

}
