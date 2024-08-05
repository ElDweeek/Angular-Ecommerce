import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products/products.service';
import { Product } from '../../interfaces/product/product.interface';

@Component({
  selector: 'product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product!: Product | undefined;

  constructor(
    private route: ActivatedRoute,
    private _productsService: ProductsService
  ) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this._productsService.getProductById(+productId).subscribe({
        next: (res) => {
          this.product = res;
        },
        error: (err) => {
          console.error(err);
        }
      });
    }
  }
}
