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
import { LoginComponent } from './components/login/login.component';
import { CategoriesComponent } from './components/categories/categories.component';

import { AuthService } from './shared/services/auth.service';
import { IsLoggedInGuard } from './shared/guards/isLoggedIn.guard';
import { router } from './shared/routes/routes';


@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    HomeComponent,
    NavbarComponent,
    CategoriesComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot(router)
  ],
  providers: [
    AuthService,
    IsLoggedInGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
