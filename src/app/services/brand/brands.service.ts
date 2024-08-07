import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrl } from '../../util/apiConfig';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {

  constructor(private _httpClient: HttpClient) { }

  getAllBrands(): Observable<any> {
    return this._httpClient.get(`${apiUrl}/api/v1/brands`)
  }

}
