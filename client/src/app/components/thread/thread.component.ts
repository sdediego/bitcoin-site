import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Rx';

import { IUser } from './../../shared/interfaces/user.interface';
import { ICategory } from './../../shared/interfaces/category.interface';
import { IThread } from './../../shared/interfaces/thread.interface';
import { IReply } from './../../shared/interfaces/reply.interface';
import { IVote } from './../../shared/interfaces/vote.interface';
import { AuthService } from './../../shared/services/auth.service';
import { ThreadService } from './../../shared/services/thread.service';


@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.css']
})
export class ThreadComponent implements OnInit {

  public user: IUser;
  public category: ICategory;
  public threadId: string;
  public thread: IThread;
  public replies: Array<IReply>;
  public votes: any | number;
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

    this.threadService.getReplyEventEmitter().subscribe(reply => {
      this.replies.unshift(reply);
    });
  }

  public ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.threadId = params['threadId'];
    });

    this.threadService.getThread(this.threadId).subscribe(
      response => {
        this.thread = response['thread'];
        this.replies = response['replies'];
        this.votes = response['votes'] || 0;
        this.category = response['thread']['category']['category'];
      },
      error => {
        this.error = error.message;
      });
  }

  public removeThread(): void {
    this.threadService.removeThread(this.threadId).subscribe(
      response => {
        this.router.navigate(['/categories', this.category]);
      },
      error => {
        this.error = error.message;
      });
  }

  public removeReply(replyId: string): void {
    this.threadService.removeReply(replyId).subscribe(
      response => {
        console.log(response);
      },
      error => {
        this.error = error.message;
      });
  }

  public onAddVote(): void {
    this.threadService.addNewVote(this.threadId).subscribe(
      response => {
        this.votes++;
      },
      error => {
        this.error = error.message;
      });
  }

}
