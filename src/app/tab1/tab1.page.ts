import { Component, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@capacitor/storage';
import { NavController, AlertController } from '@ionic/angular';
import {ContactServiceService} from '../services/contact-service.service';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  DATA_STORAGE = 'data';
  taskName="";
  taskCategory="";
  taskList = [];


  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public contactService: ContactServiceService) {}

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

  async ngOnInit(){
    this.getAllData();
  }
  insertDataToLumen(taskname,taskcategory){
    this.contactService.insertDataToLumen(this.taskName, this.taskCategory).then(data => {
      this.clearField();
      this.getAllData();
    })
  }

  getAllData(){
    this.contactService.getDataFromLumen().then(data => {
      this.taskList = data;
      console.log(data);
    });
  }
  clearField(){
    this.taskName = " ";
    this.taskCategory =" ";
  }
}
