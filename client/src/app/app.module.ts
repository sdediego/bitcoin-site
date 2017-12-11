import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import './shared/operators/rxjs.operator';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SignupComponent } from './components/signup/signup.component';
import { VerificationComponent } from './components/verification/verification.component';
import { LoginComponent } from './components/login/login.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { SingleCategoryComponent } from './components/single-category/single-category.component';
import { ThreadComponent } from './components/thread/thread.component';
import { NewThreadComponent } from './components/new-thread/new-thread.component';
import { ReplyComponent } from './components/reply/reply.component';
import { MarketsComponent } from './components/markets/markets.component';

import { AuthService } from './shared/services/auth.service';
import { ThreadService } from './shared/services/thread.service';
import { CoindeskService } from './shared/services/coindesk.service';

import { IsLoggedInGuard } from './shared/guards/isLoggedIn.guard';
import { router } from './shared/routes/routes';
import { CapitalizePipe } from './shared/pipes/capitalize.pipe';


@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    HomeComponent,
    NavbarComponent,
    CategoriesComponent,
    SingleCategoryComponent,
    ThreadComponent,
    NewThreadComponent,
    VerificationComponent,
    ReplyComponent,
    MarketsComponent
    // pipes
    CapitalizePipe,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot(router)
  ],
  providers: [
    AuthService,
    ThreadService,
    CoindeskService,
    IsLoggedInGuard
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
