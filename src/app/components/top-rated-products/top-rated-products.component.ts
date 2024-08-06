  import { Component, OnDestroy, OnInit } from '@angular/core';
  import { SingleProductComponent } from "../single-product/single-product.component";
  import { Product } from '../../interfaces/product/product.interface';
  import { ProductsService } from '../../services/products/products.service';
  import { Subscription } from 'rxjs';

  @Component({
    selector: 'top-rated-products',
    standalone: true,
    imports: [SingleProductComponent],
    templateUrl: './top-rated-products.component.html',
    styleUrl: './top-rated-products.component.scss'
  })
  export class TopRatedProductsComponent implements OnInit, OnDestroy {
    topProducts!: Array<Product>
    category: string = "womens-jewellery"

    private subscription!: Subscription;
    constructor(private _productService: ProductsService) { }

    ngOnInit(): void {
      this.getTopCategory()
    }

    getTopCategory() {
      this.subscription = this._productService.getProductsByCategory(this.category).subscribe({
        next: (res) => {
          this.topProducts = res;
          // console.log(res);
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => {
          console.log("Top Products Done");
        },
      });
    }
    ngOnDestroy() {
      if (this.subscription) {
        this.subscription.unsubscribe();
      }
    }

  }
