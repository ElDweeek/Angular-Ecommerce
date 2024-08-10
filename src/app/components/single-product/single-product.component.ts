import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../interfaces/product/product.interface';
import { Router, RouterLink } from '@angular/router';
import { ProductsService } from '../../services/products/products.service';
import { TruncatePipe } from '../../pipes/truncate/truncate.pipe';
import { AddProductService } from '../../services/Cart/add-product.service';
import { LoaderComponent } from "../loader/loader.component";

@Component({
  selector: 'single-product',
  standalone: true,
  imports: [TruncatePipe, RouterLink, LoaderComponent],
  templateUrl: './single-product.component.html',
  styleUrl: './single-product.component.scss'
})
export class SingleProductComponent {
  @Input() product!: Product;
  @Input() topProduct!: Product;
  // @Output() viewDetails = new EventEmitter<number>(); no need for output service is better

  // ngOnInit() {
  // }
constructor(private _productService : ProductsService,  private _addToCartService:AddProductService) {}
onViewDetails() {
  this._productService.getProductViewDetails(this.product.id);
}

    // onViewDetails() {
    //   this.viewDetails.emit(this.product.id);
    // }


  //cart

  addToCart(prodId:string){
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



}
