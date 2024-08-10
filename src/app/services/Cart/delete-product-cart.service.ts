import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeleteProductCartService {

  private apiUrl = 'https://ecommerce.routemisr.com/api/v1/cart';

  constructor(private _httpClient: HttpClient) { }

  deletProduct(prodId: string): Observable<any> {
    // const userToken = localStorage.getItem("token");
    // console.log(userToken);

    const headers = new HttpHeaders({
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YjI4MGIwZWQwZGMwMDE2YzA3NGI2OCIsIm5hbWUiOiJmYXRtYSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzIzMTUxNzA4LCJleHAiOjE3MzA5Mjc3MDh9.nuDXWO0J_OrqQnKsG70e7QhXfpxCo3Fsa7Qpk56a_q8'
    });

    return this._httpClient.delete<any>(`${this.apiUrl}/${prodId}`, { headers });
  }
}





