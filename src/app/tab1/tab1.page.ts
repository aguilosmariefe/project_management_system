import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  taskList = [];

  taskName: any ="";

  constructor(public navCtrl: NavController, public alertCtrl: AlertController) {}

  addTask() {
      if (this.taskName.length > 0) {
          let task = this.taskName;
          this.taskList.push(task);
          this.taskName = "";
      }
  }

  deleteTask(index){
    this.taskList.splice(index, 1);
}

async updateTask(index) {
  const alert =await this.alertCtrl.create({
      header: 'Update Task?',
      message: 'Type in your new task to update.',
      inputs: [{ name: 'editTask', placeholder: 'Task' }],
      buttons: [{ text: 'Cancel', role: 'cancel' },
                { text: 'Update', handler: data => {
                    this.taskList[index] = data.editTask; }
                }
               ]
  });
  await alert.present();

}
}
