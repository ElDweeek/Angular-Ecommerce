import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class WishListService {
  private apiUrl = 'https://ecommerce.routemisr.com/api/v1/wishlist';
  private isBrowser: boolean = false;
  private userToken = '';
  constructor(
    private _httpClient: HttpClient,
    @Inject(PLATFORM_ID) platformId: object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  getWishListProduct(): Observable<any> {
    let headers = new HttpHeaders();

    if (this.isBrowser) {
      this.userToken =JSON.parse(localStorage.getItem('token')) ;
      if (this.userToken) {
        console.log(this.userToken);

        headers = headers.set('token',this.userToken);
      }
    }

    return this._httpClient.get<any>(this.apiUrl, { headers });
  }
}
