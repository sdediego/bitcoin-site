import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { PushNotificationsService } from 'ng-push';

import { IUser } from './../../shared/interfaces/user.interface';
import { AuthService } from './../../shared/services/auth.service';
import { SubscribeService } from './../../shared/services/subscribe.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public title: string = 'Bitcointrix';
  public user: IUser;
  public email: string;
  public error: string;

  constructor(
    private authService: AuthService,
    private pushNotification: PushNotificationsService,
    private subscribeService: SubscribeService
  ) {
    this.user = this.authService.getUser();
    this.authService.getLoginEventEmitter().subscribe(user => {
      this.user = user;
    });

    pushNotification.requestPermission();
  }

  public ngOnInit(): void {}

  public onSubscribe(subscribeForm: NgForm): void {
    this.subscribeService.sendSubscritption(this.email).subscribe(
      response => {
        subscribeForm.reset();

        this.pushNotification.create('SUSCRIPCIÓN', {
          body: "Gracias por tu suscripción. Por favor, comprueba tu email ",
          icon: "./../../../assets/bitcoin_logo.png"
        }).subscribe(
          response => console.log(response),
          error => console.log(error)
        );
      },
      error => {
        console.log(error);
        this.error = error;
      }
    )
  }
}
