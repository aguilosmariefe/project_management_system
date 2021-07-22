/* eslint-disable @typescript-eslint/ban-types */
import { AlertController } from '@ionic/angular';
import { AuthenticationService } from './authentication.service';
import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService implements CanActivate {
  canAccess = false;
  constructor(
    private alertCtrl: AlertController,
    private authService: AuthenticationService,
    private location: Location
  ) { }

  async canActivate(route: ActivatedRouteSnapshot) {
    const alert = await this.alertCtrl.create({
      header: 'Warning!',
      message: 'Access Denied.',
      buttons: [
        {
          text: 'Ok',
          handler: data => {
            this.location.back();
          }
        }
      ]
    });

    await this.authService.getAuthUser().then(user => {
      this.canAccess = this.hasAccess(
        route.data.role,
        user.type
      );
    });

    if (!this.canAccess) {
      alert.present();
    }
    return this.canAccess;
  }

  hasAccess(role: string | string[], userType: string) {
    if (typeof role === 'string') {
      return role === userType;
    }

    if (typeof role === 'object') {
      return role.includes(userType);
    }
  }
}
