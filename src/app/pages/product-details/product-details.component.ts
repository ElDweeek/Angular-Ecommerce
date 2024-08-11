import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products/products.service';
import { Product } from '../../interfaces/product/product.interface';
import { AddProductService } from '../../services/Cart/add-product.service';
import { AddToWishListService } from '../../services/WishList/add-to-wish-list.service';
import { CartCountService } from '../../services/Cart/cart-count.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'product-details',
  standalone:true,
  imports:[ToastModule],
  providers:[MessageService],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})

export class ProductDetailsComponent implements OnInit {
  product!: Product | undefined;

  constructor(
    private route: ActivatedRoute,
    private _productsService: ProductsService,
    private _addToCartService:AddProductService,
    private _addToWishList:AddToWishListService,
    private _cartCount:CartCountService,
    private _messageService:MessageService
  ) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this._productsService.getProductById(productId).subscribe({
        next: (res) => {
          this.product = res.data;
          console.log(this.product);

        },
        error: (err) => {
          console.error(err);
        }
      });
    }
  }


  show() {
    this._messageService.add({ severity: 'success', summary: 'Success', detail: 'Product added successfully'});
  }
  addProductToCart(prodId:string){
    this._addToCartService.addToCart(prodId).subscribe(
    {
      next: (res) => {
        console.log(res);
        this.show()
        const newCount = res.numOfCartItems;
        this._cartCount.updateNumOfCartItems(newCount);
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
        this.show()
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
