import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterStateSnapshot } from '@angular/router';
import { NgForm } from '@angular/forms';

import { Observable } from 'rxjs/Rx';

import { IUser } from './../../shared/interfaces/user.interface';
import { ICategory } from './../../shared/interfaces/category.interface';
import { IThread } from './../../shared/interfaces/thread.interface';
import { IReply } from './../../shared/interfaces/reply.interface';
import { IVote } from './../../shared/interfaces/vote.interface';
import { AuthService } from './../../shared/services/auth.service';
import { ThreadService } from './../../shared/services/thread.service';
import { CoindeskService } from './../../shared/services/coindesk.service';


@Component({
  selector: 'app-new-thread',
  templateUrl: './new-thread.component.html',
  styleUrls: ['./new-thread.component.css']
})
export class NewThreadComponent implements OnInit {

  public user: IUser;
  public thread: IThread = {
    title: "",
    content:"",
    bitcoinPrice: 0.00
  };
  public category: ICategory | string;
  public error: string;

  constructor(
    private authService: AuthService,
    private threadService: ThreadService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private coindeskService: CoindeskService
  ) {
    this.user = this.authService.getUser();
    this.authService.getLoginEventEmitter().subscribe(user => {
      this.user = user;
    });
  }

  public ngOnInit(): void {
    this.category = this.activatedRoute.snapshot.queryParams['category'];
    this.getBtcPrice();
  }

  private getBtcPrice(): void {
    this.coindeskService.getCurrentBtcPrice().subscribe(
      response => {
        this.thread['bitcoinPrice'] = parseInt(response['bpi']['USD']['rate_float']);
      },
      error => {
        this.error = error.message;
      });
  }

  public onSubmitThread(threadForm: NgForm): void {
    this.threadService.postNewThread(this.thread, this.category)
      .subscribe(
        response => {
          threadForm.reset();
          this.router.navigate(['/categories', this.category]);
        },
        error => {
          this.error = error.message;
      });
  }

}
