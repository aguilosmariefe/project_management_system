import { ToastController, LoadingController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {NgForm} from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.page.html',
  styleUrls: ['./create-user.page.scss'],
})
export class CreateUserPage implements OnInit {
  constructor(
      private location: Location,
      private userService: UserService,
      private toastCtrl: ToastController,
      private loadingState: LoadingController,
  ) { }

  ngOnInit() {
  }
  back(){
    this.location.back();
  }
  async onSubmit(f: NgForm){
    const loading = await this.loadingState.create({
      message: this.userService.loadingMessage
    });
    await loading.present();
    this.userService.create(f.value).then(async user => {
      this.location.back();
      const toast = await this.toastCtrl.create({
        color: 'success',
        duration: 3000,
        message: 'User successfully created!',
      });
      await toast.present();
    }).catch(async ({error}) => {
      const toast = await this.toastCtrl.create({
        color: 'danger',
        duration: 3000,
        message: error.email[0],
      });
      await toast.present();
    }).finally(async ()=> {
      await this.loadingState.dismiss();
    });
  }
}
