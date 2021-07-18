import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService {

  constructor(
      private http: HttpClient
  ) {
    super();
  }

  all(): Promise<User[]> {
    return new Promise((resolve, reject) => {
        this.http.get<User[]>(`${this.apiUrl}/users`).subscribe(users => {
            resolve(users);
        }, err => {
            reject(err);
        });
    });
  }
}

export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    created_at: string;
    updated_at: string;
}
