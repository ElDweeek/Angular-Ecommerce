import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../interfaces/product/product.interface';
import { Router, RouterLink } from '@angular/router';
import { ProductsService } from '../../services/products/products.service';
import { TruncatePipe } from '../../pipes/truncate/truncate.pipe';
import { AddProductService } from '../../services/Cart/add-product.service';
import { AddToWishListService } from '../../services/WishList/add-to-wish-list.service';


import { LoaderComponent } from "../loader/loader.component";
import { CartCountService } from '../../services/Cart/cart-count.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';


@Component({
  selector: 'single-product',
  standalone: true,
  imports: [TruncatePipe, RouterLink, LoaderComponent,ToastModule],
  providers:[MessageService],
  templateUrl: './single-product.component.html',
  styleUrl: './single-product.component.scss'
})
export class SingleProductComponent {
  @Input() product!: Product;
  @Input() topProduct!: Product;
  // @Output() viewDetails = new EventEmitter<number>(); no need for output service is better

  // ngOnInit() {
  // }
constructor(private _productService : ProductsService,  private _addToCartService:AddProductService,private _addToWishList:AddToWishListService,private _cartCount:CartCountService,private _messageService:MessageService) {}
onViewDetails() {
  this._productService.getProductViewDetails(this.product.id);
}

    // onViewDetails() {
    //   this.viewDetails.emit(this.product.id);
    // }



  show() {
    this._messageService.add({ severity: 'success', summary: 'Success', detail: 'Product added  successfully'});
  }
    //cart
  addToCart(prodId:string){
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
        this.show()
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
