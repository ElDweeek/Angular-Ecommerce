import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private apiUrl = 'http://localhost:3000/signUp';

  constructor(private _httpClient: HttpClient) { }

  addUser(user: any): Observable<any> {
    return this._httpClient.post<any>(this.apiUrl, user, {
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
