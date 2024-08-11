import { Inject, inject, Injectable, PLATFORM_ID } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationService {
  userName: string = '';
  httpClient = inject(HttpClient);
  loggedIn: BehaviorSubject<string> = new BehaviorSubject('');
  isBrowser: Boolean = false;
  router = inject(Router);
  token: string = '';
  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);
    if (this.isBrowser) {
      if (localStorage.getItem('token')) {
        this.token = JSON.parse(localStorage.getItem('token'));
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
      localStorage.removeItem('numOfCartItems');
      this.loggedIn.next('');
      this.router.navigate(['/signin']);
    }
  }

  addAddresses(address: any): Observable<any> {
    const headers = new HttpHeaders({
      token: this.token,
    });
    const url = `https://ecommerce.routemisr.com/api/v1/addresses`;
    return this.httpClient.post(url, address, { headers });
  }
  removeAddress(addressId): Observable<any> {
    const headers = new HttpHeaders({
      token: this.token,
    });

    const url = `https://ecommerce.routemisr.com/api/v1/addresses/${addressId}`;
    return this.httpClient.delete(url, { headers });
  }
  getUserAddresses(): Observable<any> {
    const headers = new HttpHeaders({
      token: this.token,
    });
    const url = `https://ecommerce.routemisr.com/api/v1/addresses`;
    return this.httpClient.get(url, { headers });
  }
}
