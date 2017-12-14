import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { ChartsModule } from 'ng2-charts';
import { PushNotificationsModule } from 'ng-push';
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
import { ChartComponent } from './components/chart/chart.component';
import { RealTimeComponent } from './components/real-time/real-time.component';
import { BitstampComponent } from './components/bitstamp/bitstamp.component';
import { BitfinexComponent } from './components/bitfinex/bitfinex.component';
import { FooterComponent } from './components/footer/footer.component';

import { AuthService } from './shared/services/auth.service';
import { ThreadService } from './shared/services/thread.service';
import { CoindeskService } from './shared/services/coindesk.service';
import { BitstampService } from './shared/services/bitstamp.service';
import { SubscribeService } from './shared/services/subscribe.service';

import { IsLoggedInGuard } from './shared/guards/isLoggedIn.guard';
import { router } from './shared/routes/routes';
import { CapitalizePipe } from './shared/pipes/capitalize.pipe';
import { SubscriptionComponent } from './components/subscription/subscription.component';


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
    MarketsComponent,
    ChartComponent,
    RealTimeComponent,
    BitstampComponent,
    BitfinexComponent,
    FooterComponent,
    // pipes
    CapitalizePipe,
    SubscriptionComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot(router),
    ChartsModule,
    PushNotificationsModule
  ],
  providers: [
    AuthService,
    ThreadService,
    CoindeskService,
    BitstampService,
    SubscribeService,
    IsLoggedInGuard
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
