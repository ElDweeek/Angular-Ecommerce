import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductsService } from '../../services/products/products.service';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { Subscription } from 'rxjs';
import { Product } from '../../interfaces/product/product.interface';
import { TruncateModule } from '../../modules/truncate.module';
import { SingleProductComponent } from "../../components/single-product/single-product.component";
import { TopRatedProductsComponent } from "../../components/top-rated-products/top-rated-products.component";

@Component({
  selector: 'products',
  standalone: true,
  imports: [CardModule, ButtonModule, TruncateModule, SingleProductComponent, TopRatedProductsComponent],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: Array<Product> = [];
  limit: number = 7;
  skip: number = 0;
  hasMoreData: boolean = true;

  private subscription!: Subscription;
  constructor(private _getProducts: ProductsService) {}

  ngOnInit() {

    this.getStreamOfData()

  }

  getStreamOfData(){

    this.subscription = this._getProducts.getStreamOfProducts(this.limit,this.skip).subscribe({
      next: (res) => {
        this.products = [...this.products, ...res.products];
        // console.log(this.products);
        this.skip += this.limit;
        this.hasMoreData = res.products.length === this.limit;
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log("Got Products");
      },
    });

  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
