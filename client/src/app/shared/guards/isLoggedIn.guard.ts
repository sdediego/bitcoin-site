import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs/Rx';

import { AuthService } from './../services/auth.service';


@Injectable()
export class IsLoggedInGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const isLoggedinIn = this.authService.getUser() ? true : false;
    if (!isLoggedinIn) {
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
      return false;
    }
    return isLoggedinIn;
  }

}
