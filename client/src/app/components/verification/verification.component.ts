import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Rx';

import { AuthService } from './../../shared/services/auth.service';


@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.css']
})
export class VerificationComponent implements OnInit {

  private token: string;
  public error: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  public ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.token = params['token'];
    });
    console.log(this.token);
    this.authService.verification(this.token).subscribe(
      response => {
        this.router.navigate(['/login']);
      },
      error => {
        this.error = error.message;
      });
  }

}
