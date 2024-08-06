import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductsService } from '../../services/products/products.service';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { Subscription } from 'rxjs';
import { Product } from '../../interfaces/product/product.interface';
import { TruncateModule } from '../../modules/truncate.module';
import { SingleProductComponent } from "../../components/single-product/single-product.component";
import { TopRatedProductsComponent } from "../../components/top-rated-products/top-rated-products.component";
import { NgIf } from '@angular/common';

@Component({
  selector: 'products',
  standalone: true,
  imports: [CardModule, ButtonModule, TruncateModule, SingleProductComponent, TopRatedProductsComponent,NgIf],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: Array<Product> = [];
  limit: number = 10;
  page: number = 0;
  hasMoreData: boolean = true;
  isLoading = true;

  private subscription!: Subscription;
  constructor(private _getProducts: ProductsService) {}

  ngOnInit() {

    this.getStreamOfData()

  }

  getStreamOfData(){

    this.subscription = this._getProducts.getStreamOfProducts(this.limit,this.page).subscribe({
      next: (res) => {
        this.products = [...this.products, ...res.data];
        // console.log(this.products);
        this.page ++;
        this.hasMoreData = res.data.length === this.limit;
        this.isLoading = false;

      },
      error: (err) => {
        console.log(err);
        this.isLoading = false;

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
