import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = 'https://ecommerce.routemisr.com/api/v1/cart';

  constructor(private _httpClient: HttpClient) {}

  getCartProducts(): Observable<any> {
    const  userToken=localStorage.getItem("token");
    const x=JSON.parse(userToken)
    console.log();
    console.log(userToken=="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YjUzMzNkZWQwZGMwMDE2YzFhODczNyIsIm5hbWUiOiJoZW5kaGVuZCIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzIzMTUxMjUyLCJleHAiOjE3MzA5MjcyNTJ9.CewniiUtkwVRpBuDvHR8ol018MdGS2McaC46uwvo5E4");

    const headers = new HttpHeaders({
        token:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YjI4MGIwZWQwZGMwMDE2YzA3NGI2OCIsIm5hbWUiOiJmYXRtYSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzIzMTUxNzA4LCJleHAiOjE3MzA5Mjc3MDh9.nuDXWO0J_OrqQnKsG70e7QhXfpxCo3Fsa7Qpk56a_q8'
    });

    return this._httpClient.get<any>(this.apiUrl, { headers });
  }
}
