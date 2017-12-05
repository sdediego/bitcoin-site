import { Routes } from '@angular/router';

import { AppComponent } from './../../app.component';
import { LoginComponent } from './../../components/login/login.component';
import { SignupComponent } from './../../components/signup/signup.component';

export const router: Routes = [
  { path: '', component: AppComponent, pathMatch: 'full' },
  { path: 'signup', component: SignupComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  { path: '**', redirectTo: '' }
];
