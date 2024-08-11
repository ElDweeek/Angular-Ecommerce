import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class UpdatProductCartService {

  private apiUrl = 'https://ecommerce.routemisr.com/api/v1/cart';
  private isBrowser: boolean = false;
  private userToken = '';
  constructor(private _httpClient: HttpClient, @Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  updateCart(productId:string,newCount:number): Observable<any> {
    let headers = new HttpHeaders();

    if (this.isBrowser) {
      this.userToken = JSON.parse(localStorage.getItem('token'))
      if (this.userToken) {
        headers = headers.set('token', this.userToken);
      }
    }
    const body = { count:newCount };
    return this._httpClient.put<any>(`${this.apiUrl}/${productId}`,body, { headers });
  }

}
