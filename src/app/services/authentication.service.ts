import { Injectable } from '@angular/core';

import { Storage } from '@capacitor/storage';

import { HttpClient } from '@angular/common/http';
import { map, tap, switchMap } from 'rxjs/operators';
import { BehaviorSubject, Observable, from } from 'rxjs';
import { BaseService } from './base.service';

const ACCESS_TOKEN = 'access_token';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService extends BaseService {
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  token = '';
  authUser?: any;

  constructor(private http: HttpClient) {
    super();
    this.setToken();
    this.setAuthUser();
  }

  async setToken() {
    const token = await Storage.get({ key: ACCESS_TOKEN });
    if (token && token.value) {
      this.token = token.value;
      this.isAuthenticated.next(true);
    } else {
      this.isAuthenticated.next(false);
    }
  }
  async setAuthUser() {
    const user = await Storage.get({ key: 'user' });
    if (user) {
      this.authUser = JSON.parse(user.value);
    }
  }

  login({ email, password }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password }).pipe(
      tap(({ token, user }) => {
        from(Storage.set({ key: ACCESS_TOKEN, value: token }));
        from(Storage.set({ key: 'user', value: JSON.stringify(user) }));
        this.isAuthenticated.next(true);
      })
    );

  }
  logout(): void {
    this.isAuthenticated.next(false);
    Storage.remove({ key: ACCESS_TOKEN });
    Storage.remove({ key: 'user' });
  }

  getUserRole(): string {
    return this.authUser.type;
  }
}
