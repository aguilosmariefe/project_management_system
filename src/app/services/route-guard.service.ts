import { AlertController } from '@ionic/angular';
import { AuthenticationService } from './authentication.service';
import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService implements CanActivate {

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
    const hasAccess = this.hasAccess(
      route.data.role,
      this.authService.getUserRole()
    );

    if (!hasAccess) {
       alert.present();
    }
    return hasAccess;
  }

  hasAccess(role: string, userType: string) {
    return role === userType;
  }
}
