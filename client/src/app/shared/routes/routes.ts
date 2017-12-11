import { Routes } from '@angular/router';

import { AppComponent } from './../../app.component';
import { HomeComponent } from './../../components/home/home.component';
import { LoginComponent } from './../../components/login/login.component';
import { SignupComponent } from './../../components/signup/signup.component';
import { VerificationComponent } from './../../components/verification/verification.component';
import { CategoriesComponent } from './../../components/categories/categories.component';
import { SingleCategoryComponent } from './../../components/single-category/single-category.component';
import { ThreadComponent } from './../../components/thread/thread.component';
import { NewThreadComponent } from './../../components/new-thread/new-thread.component';
import { MarketsComponent } from './../../components/markets/markets.component';
import { RealTimeComponent } from './../../components/real-time/real-time.component';

import { IsLoggedInGuard } from './../guards/isLoggedIn.guard';


export const router: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  { path: 'signup', component: SignupComponent, pathMatch: 'full' },
  { path: 'verification/:token', component: VerificationComponent, pathMatch: 'full' },
  { path: 'categories', component: CategoriesComponent, pathMatch: 'full' },
  { path: 'categories/:category', component: SingleCategoryComponent, pathMatch: 'full' },
  { path: 'thread/new', component: NewThreadComponent, canActivate: [IsLoggedInGuard], pathMatch: 'full' },
  { path: 'thread/:threadId', component: ThreadComponent, pathMatch: 'full' },
  //{ path: 'thread/:threadId/remove', component: ThreadComponent, canActivate: [IsLoggedInGuard], pathMatch: 'full' }
  { path: 'markets', component: MarketsComponent, pathMatch: 'full' },
  { path: 'markets/real-time', component: RealTimeComponent, pathMatch: 'full' },
  { path: '**', redirectTo: '' }
];
