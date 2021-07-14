import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
   readonly apiUrl = 'http://172.16.33.31:8000/api';

   constructor(
       public toastController?: ToastController,
   ) {}
   async toastMessage(option) {
    const toast = await this.toastController.create({
        color: option.color,
        duration: 2000,
        message: option.message,
      });
      await toast.present();
  }
}
