import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { PushNotificationsService } from 'ng-push';

import { IUser } from './../../shared/interfaces/user.interface';
import { AuthService } from './../../shared/services/auth.service';
import { SubscribeService } from './../../shared/services/subscribe.service';


@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css']
})
export class SubscriptionComponent implements OnInit {

  public user: IUser;
  public email: string;
  public error: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private subscribeService: SubscribeService,
    private pushNotification: PushNotificationsService
  ) {}

  public ngOnInit(): void {}

  public onSubscribe(subscribeForm: NgForm): void {
    this.subscribeService.sendSubscritption(this.email).subscribe(
      response => {
        subscribeForm.reset();
        this.router.navigate(['']);
        // Push service anouncing email checking
        this.pushNotification.create('SUSCRIPCIÓN', {
          body: "Gracias por tu suscripción. Por favor, comprueba tu email ",
          icon: "./../../../assets/bitcoin_logo.png"
        }).subscribe(
          response => console.log(response),
          error => console.log(error)
        );
      },
      error => {
        this.error = error;
      }
    )
  }

}
