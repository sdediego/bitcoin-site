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


@Component({
  selector: 'app-new-thread',
  templateUrl: './new-thread.component.html',
  styleUrls: ['./new-thread.component.css']
})
export class NewThreadComponent implements OnInit {

  public user: IUser;
  public thread: IThread;
  public category: ICategory | string;
  public error: string;

  constructor(
    private authService: AuthService,
    private threadService: ThreadService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.user = this.authService.getUser();
    this.authService.getLoginEventEmitter().subscribe(user => {
      this.user = user;
    });
  }

  public ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.category = params['category'];
    });
  }

  public onSubmitThread(threadForm: NgForm): void {
    this.threadService.postNewThread(this.thread).subscribe(
      response => {
        console.log(response);
        this.router.navigate(['/categories', this.category]);
      },
      error => {
        this.error = error.message;
        console.log(this.error);
      });
  }

}
