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
  public thread: IThread = { title: "", content:"" };
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
    this.category = this.activatedRoute.snapshot.queryParams['category'];
    console.log(this.category);
    //this.activatedRoute.params.subscribe(params => {
    //  this.category = params['category'];
    //  console.log(this.category);
    //});
  }

  public onSubmitThread(threadForm: NgForm): void {
    console.log('Submiting new thread: ', this.thread, this.category);
    this.threadService.postNewThread(this.thread, this.category).subscribe(
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
