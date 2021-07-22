import { ADMIN, PM, DEV, User } from './user.service';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

import { Storage } from '@capacitor/storage';

import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { BehaviorSubject, Observable, from } from 'rxjs';
import { BaseService } from './base.service';

const ACCESS_TOKEN = 'access_token';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService extends BaseService {
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  token = '';
  public authUser?: any;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
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

  async getAuthUser(): Promise<User> {
    const user = await Storage.get({ key: 'user' });
    if (user) {
      this.authUser = JSON.parse(user.value);
      return JSON.parse(user.value);
    }
    return null;
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
    return this.authUser ? this.authUser.type : null;
  }

  redirectBaseOnRole(role: string) {
    switch (role) {
      case ADMIN:
        this.router.navigateByUrl('/manage/admin/dashboard', { replaceUrl: true });
        break;
      case PM:
      case DEV:
        this.router.navigateByUrl('/manage/users/projects/dashboard', { replaceUrl: true });
        break;
    }
  }
}
