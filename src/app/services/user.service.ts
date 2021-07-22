import { ToastController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService {

  constructor(
    private http: HttpClient,
    public toastController: ToastController
  ) {
    super(toastController);
  }

  async all(): Promise<User[]> {
    return await new Promise((resolve, reject) => {
      this.http.get<User[]>(`${this.apiUrl}/users`).subscribe(users => {
        resolve(users);
      }, err => {
        reject(err);
      });
    });
  }

  async summary(): Promise<UsersSummary> {
    return await new Promise((resolve, reject) => {
      this.http.get<UsersSummary>(`${this.apiUrl}/users/summary`).subscribe(summary => {
        resolve(summary);
      }, err => {
        reject(err);
      });
    });
  }

  async create(data: any): Promise<User> {
    return await new Promise((resolve, reject) => {
      this.http.post<User>(`${this.apiUrl}/users`, data).subscribe(user => {
        resolve(user);
      }, err => {
        reject(err);
      });
    });
  }

  async getUserByRole(role: string): Promise<User[]> {
    return await new Promise((resolve, reject) => {
      this.http.get<User[]>(`${this.apiUrl}/users/types/${role}`).subscribe(users => {
        resolve(users);
      }, err => {
        reject(err);
      });
    });
  }
}

export const ADMIN = 'ADMIN';
export const PM = 'PM';
export const DEV = 'DEV';
export interface User {
  id: number;
  name: string;
  email: string;
  type: string;
  password: string;
  created_at: string;
  updated_at: string;
}

export interface UsersSummary {
  all: number;
  pm: number;
  dev: number;
}
