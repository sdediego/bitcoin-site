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

  public ngOnInit(): void {}

}
