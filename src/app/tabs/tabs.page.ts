import { ADMIN, PM, DEV } from './../services/user.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Component } from '@angular/core';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private alertController: AlertController
  ) { }

  async logout() {
    const alert = await this.alertController.create({
      header: 'Logout',
      subHeader: 'Are you sure want to logout?',
      buttons: [
        {
          text: 'Ok',
          handler: async data => {
            await this.authService.logout();
            this.router.navigateByUrl('/', { replaceUrl: true });
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    await alert.present();

  }

  gotoDashboard() {
    if (this.authService.getUserRole() === ADMIN) {
      return 'admin/dashboard';
    }

    if (
      this.authService.getUserRole() === PM ||
      this.authService.getUserRole() === DEV
    ) {
      return 'users/projects/dashboard';
    }
  }
}
