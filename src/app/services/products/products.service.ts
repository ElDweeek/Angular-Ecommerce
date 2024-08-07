import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Product } from '../../interfaces/product/product.interface';
import { Router } from '@angular/router';
import { apiUrl } from '../../util/apiConfig';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  // 17
  // _httpClient = Inject(HttpClient)
  // constructor() {}
  // 16
  constructor(private _httpClient: HttpClient, private router: Router) { }


  getAllProducts(): Observable<any> {
    return this._httpClient.get(`${apiUrl}/api/v1/products?limit=0`)
  }

  getStreamOfProducts(limit: number, page: number): Observable<any> {
    return this._httpClient.get(`${apiUrl}/api/v1/products?limit=${limit}&page=${page}`)
  }

  getProductById(id: string): Observable<any> {
    return this._httpClient.get<Product>(`${apiUrl}/api/v1/products/${id}`)
  }

  getProductViewDetails(productId: string) {
    this.router.navigate([`/products/${productId}`]);
  }

  getProductsByCategory(category: string): Observable<any> {
    return this._httpClient.get<any>(`${apiUrl}/api/v1/products?limit=0`).pipe(
      map(res => res.data.filter((product: Product) => product.category.name === category))
    )
  }
}

