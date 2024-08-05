import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Product } from '../../interfaces/product/product.interface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  // 17
  // _httpClient = Inject(HttpClient)
  // constructor() {}
  // 16
  constructor(private _httpClient: HttpClient,private router: Router ) { }


  getAllProducts(): Observable<any> {
    return this._httpClient.get(`https://dummyjson.com/products`)
  }

getStreamOfProducts(limit: number,skip:number): Observable<any> {
  return this._httpClient.get(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`)
}

  getProductById(id: number): Observable<any> {
    return this._httpClient.get<Product>(`https://dummyjson.com/products/${id}`)
  }

  getProductViewDetails(productId: number) {
    this.router.navigate([`/products/${productId}`]);
  }

  getProductsByCategory(category: string): Observable<any> {
    return this._httpClient.get<any>(`https://dummyjson.com/products?limit=0`).pipe(
      map(res => res.products.filter((product: Product)=> product.category === category))
    )
  }
}

