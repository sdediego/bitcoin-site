import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Rx';

import { IUser } from './../../shared/interfaces/user.interface';
import { ICategory } from './../../shared/interfaces/category.interface';
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
  public replies: Array<Reply>;
  public votes: number;
  public error: string;

  constructor(
    private authService: AuthService,
    private threadService: ThreadService
  ) {
    this.user = this.authService.getUser();
    this.authService.getLoginEventEmitter().subscribe(user => {
      this.user = user;
    });
  }

  public ngOnInit(): void {
    this.router.params.subscribe(params => {
      this.threadId = params['threadId'];
    });

    this.threadService.getThread(this.threadId).subscribe(
      response => {
        console.log(response);
        this.thread = response['thread'];
        this.replies = response['replies'];
        this.votes = response['votes'];
      },
      error => {
        this.error = error.message;
        console.log(this.error);
      });
  }

}
