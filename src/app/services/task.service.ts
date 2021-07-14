import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService extends BaseService {

  constructor(
      private http: HttpClient,
      public toastController: ToastController
  ) {
      super(toastController);
   }

   create(data, projectId): Promise<any> {
    return new Promise((resolve, reject) => {
        this.http.post(`${this.apiUrl}/projects/${projectId}/tasks`,data).subscribe(task => {
            resolve(task);
        }, err => {
            reject(err);
        });
    });
}

update(data, id): Promise<any> {
    return new Promise((resolve, reject) => {
        this.http.put(`${this.apiUrl}/projects/tasks/${id}`,data).subscribe(task => {
            resolve(task);
        }, err => {
            reject(err);
        });
    });
}
}

export interface Task {
    id: number;
    title: string;
    description: string;
    status: string;
    user_id: number;
    project_id: number;
    created_at: string;
    updated_at: string;
}
