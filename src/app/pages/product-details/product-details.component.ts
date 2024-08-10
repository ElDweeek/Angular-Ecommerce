import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products/products.service';
import { Product } from '../../interfaces/product/product.interface';
import { AddProductService } from '../../services/Cart/add-product.service';
import { AddToWishListService } from '../../services/WishList/add-to-wish-list.service';

@Component({
  selector: 'product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product!: Product | undefined;

  constructor(
    private route: ActivatedRoute,
    private _productsService: ProductsService,
    private _addToCartService:AddProductService,
    private _addToWishList:AddToWishListService
  ) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this._productsService.getProductById(productId).subscribe({
        next: (res) => {
          this.product = res.data;
          console.log(res);

        },
        error: (err) => {
          console.error(err);
        }
      });
    }
  }



  addProductToCart(prodId:string){
    this._addToCartService.addToCart(prodId).subscribe(
    {
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);

      },
      complete: () => {
        console.log("completed");
      }
    }
  )
  }
  addToWishList(prodId:string){
    this._addToWishList.addToWishList(prodId).subscribe(
    {
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);

      },
      complete: () => {
        console.log("completed");
      }
    }
  )
  }
}
