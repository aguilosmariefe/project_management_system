/* eslint-disable @angular-eslint/contextual-lifecycle */
import { Injectable, OnInit } from '@angular/core';
import { CanLoad } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { filter, map, take } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AutoLoginGuard implements CanLoad {

  constructor(
    public authService: AuthenticationService,
  ) { }

  canLoad(): Observable<boolean> {
    this.authService.setAuthUser();
    return this.authService.isAuthenticated.pipe(
      filter(val => val !== null), // Filter out initial Behaviour subject value
      take(1), // Otherwise the Observable doesn't complete!
      map((isAuthenticated) => {
        console.log('Found previous token, automatic login');
        if (isAuthenticated) {
          // Directly open inside area
          this.authService.getAuthUser().then(user => this.authService.redirectBaseOnRole(user.type));
        } else {
          // Simply allow access to the login
          return true;
        }
      })
    );
  }
}

