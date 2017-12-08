import { Routes } from '@angular/router';

import { AppComponent } from './../../app.component';
import { HomeComponent } from './../../components/home/home.component';
import { LoginComponent } from './../../components/login/login.component';
import { SignupComponent } from './../../components/signup/signup.component';
import { CategoriesComponent } from './../../components/categories/categories.component';

import { IsLoggedInGuard } from './../guards/isLoggedIn.guard';


export const router: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'signup', component: SignupComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  { path: 'categories', component: CategoriesComponent, pathMatch: 'full' },
  //{ path: 'categories/:categoryId', component: SingleCategoryComponent, pathMatch: 'full' },
  { path: '**', redirectTo: '' }
];
