import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products/products.service';
import { Observable } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { SingleProductComponent } from "../../components/single-product/single-product.component";

@Component({
  selector: 'home',
  standalone: true,
  imports: [NgIf, NgFor, SingleProductComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  products: any[] = []; // Initialize as an empty array
  isLoading: boolean = true; // To show a loading indicator

  constructor(
    private _productService: ProductsService,
    private cd: ChangeDetectorRef // Inject ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts() {
    this._productService.getAllProducts().subscribe({
      next: (res) => {
        // console.log(res);
        this.products = res.data;
        this.isLoading = false;
        // this.cd.detectChanges(); // Manually trigger change detection
      },
      error: (err) => {
        console.log(err);
        this.isLoading = false;
      },
      complete: () => {
        console.log('Root');
      }
    });
  }
}
