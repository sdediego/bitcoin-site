import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Rx';

import { IUser } from './../../shared/interfaces/user.interface';
import { IThread } from './../../shared/interfaces/thread.interface';
import { IReply } from './../../shared/interfaces/reply.interface';
import { AuthService } from './../../shared/services/auth.service';
import { ThreadService } from './../../shared/services/thread.service';


@Component({
  selector: 'app-reply',
  templateUrl: './reply.component.html',
  styleUrls: ['./reply.component.css']
})
export class ReplyComponent implements OnInit {

  public user: IUser;
  public threadId: string;
  public thread: IThread;
  public reply: IReply = { content: ""};
  public error: string;

  constructor(
    private authService: AuthService,
    private threadService: ThreadService,
    private activatedRoute: ActivatedRoute
  ) {
    this.user = this.authService.getUser();
    this.authService.getLoginEventEmitter().subscribe(user => {
      this.user = user;
    });
  }

  public ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.threadId = params['threadId'];
    });
    console.log(this.reply, this.threadId);
  }

  public onSubmitReply(replyForm: NgForm): void {
    console.log(this.reply, this.threadId);
    this.threadService.postNewReply(this.reply, this.threadId).subscribe(
      response => {
        replyForm.reset();
      },
      error =>{
        this.error = error.message;
      });
  }

}
