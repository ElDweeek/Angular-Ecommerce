import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products/products.service';
import { Product } from '../../interfaces/product/product.interface';
import { LoaderComponent } from "../loader/loader.component";
import { SingleProductComponent } from "../single-product/single-product.component";

@Component({
  selector: 'bra-and-cat-products',
  standalone: true,
  imports: [LoaderComponent, SingleProductComponent],
  templateUrl: './bra-and-cat-products.component.html',
  styleUrl: './bra-and-cat-products.component.scss'
})
export class BraAndCatProductsComponent implements OnInit {
  products: Array<Product> = [];
  isLoading: boolean = true;
  displayName:string = '';
  displayType:string = '';

  constructor(private route: ActivatedRoute, private _productsService: ProductsService) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const braOrCat = params['braOrCat'];
      const name = params['name'];


      if (braOrCat && name) {
        this.displayName = name;
        this.displayType = braOrCat;


        if (braOrCat === 'category') {
          this.getProductsByCategory(name);
        } else if (braOrCat === 'brand') {
          this.getProductsByBrand(name);
        }
      }
    });
  }

  getProductsByCategory(name: string) {
    this._productsService.getProductsByCategory(name).subscribe({
      next: (res) => {
        this.products = res;
        this.isLoading = false;
      },
      error: (err) => {
        console.log(err);
        this.isLoading = false;
      }
    });
  }

  getProductsByBrand(name: string) {
    this._productsService.getProductsByBrands(name).subscribe({
      next: (res) => {
        this.products = res;
        this.isLoading = false;
      },
      error: (err) => {
        console.log(err);
        this.isLoading = false;
      }
    });
  }
}
