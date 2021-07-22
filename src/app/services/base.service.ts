import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
   readonly apiUrl = 'http://localhost:8000/api';
   readonly loadingMessage = 'Please wait...';

   constructor(
       public toastController?: ToastController,
   ) {}
   async toastMessage(option) {
    const toast = await this.toastController.create({
        color: option.color,
        duration: 3000,
        message: option.message,
      });
      await toast.present();
  }
}
