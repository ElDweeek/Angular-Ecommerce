import { Inject, inject, Injectable, PLATFORM_ID } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationService {
  userName: string = '';
  httpClient = inject(HttpClient);
  loggedIn: BehaviorSubject<string> = new BehaviorSubject('');
  isBrowser: Boolean = false;
  router = inject(Router);
  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);
    if (this.isBrowser) {
      if (localStorage.getItem('token')) {
        this.loggedIn.next(JSON.parse(localStorage.getItem('token')));
      }
      if (localStorage.getItem('username')) {
        this.userName = JSON.parse(localStorage.getItem('username'));
      }
    }
  }

  signUp(data: any): Observable<any> {
    return this.httpClient.post(
      'https://ecommerce.routemisr.com/api/v1/auth/signup',
      data
    );
  }
  signIn(data: any): Observable<any> {
    return this.httpClient.post(
      'https://ecommerce.routemisr.com/api/v1/auth/signin',
      data
    );
  }
  saveUserToken(token: string, username: string) {
    if (this.isBrowser) {
      localStorage.setItem('token', JSON.stringify(token));
      localStorage.setItem('username', JSON.stringify(username));
      this.loggedIn.next(token);
    }
  }
  logOut() {
    if (this.isBrowser) {
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      this.loggedIn.next('');
      this.router.navigate(['/signin']);
    }
  }
}
