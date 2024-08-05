import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TruncateModule } from '../../modules/truncate.module';
import { Product } from '../../interfaces/product/product.interface';
import { Router, RouterLink } from '@angular/router';
import { ProductsService } from '../../services/products/products.service';

@Component({
  selector: 'single-product',
  standalone: true,
  imports: [TruncateModule,RouterLink],
  templateUrl: './single-product.component.html',
  styleUrl: './single-product.component.scss'
})
export class SingleProductComponent {
  @Input() product!: Product;
  @Input() topProduct!: Product;
  // @Output() viewDetails = new EventEmitter<number>(); no need for output service is better

  // ngOnInit() {
  // }
constructor(private _productService : ProductsService) {}
onViewDetails() {
  this._productService.getProductViewDetails(this.product.id);
}

    // onViewDetails() {
    //   this.viewDetails.emit(this.product.id);
    // }
}
