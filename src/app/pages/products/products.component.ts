import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductsService } from '../../services/products/products.service';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { Subscription } from 'rxjs';
import { Product } from '../../interfaces/product/product.interface';
import { SingleProductComponent } from "../../components/single-product/single-product.component";
import { TopRatedProductsComponent } from "../../components/top-rated-products/top-rated-products.component";
import { LoaderComponent } from "../../components/loader/loader.component";
import { PaginatorComponent } from "../../components/paginator/paginator.component";
import { SliderModule } from 'primeng/slider';
import { AutoCompleteModule } from 'primeng/autocomplete';  // Import AutoCompleteModule
import { FormsModule } from '@angular/forms';  // Import FormsModule
import { NgFor, NgIf } from '@angular/common';


@Component({
  selector: 'products',
  standalone: true,
  imports: [CardModule, ButtonModule, SingleProductComponent, TopRatedProductsComponent, LoaderComponent, PaginatorComponent,SliderModule,AutoCompleteModule,FormsModule,NgFor,NgIf],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {
  selectedProduct: any;

  rangeValues: number[] = [];
  active: string ="";
  //---------------------------
  productsHeader: string = "All Products"
  products: Array<Product> = [];
  //-----------------------------
  searchTerm: string = '';
  filteredProducts: any[] = [];
  minPrice!:number
  maxPrice!:number
  //-----------------------------
  paginatedProducts: Array<Product> = [];
  start = 0;
  end = 10;
  rows = 10;
  currentPageProducts: number = 0;
  //-----------------------------

  private _subscription!: Subscription;
  constructor(private _productsService: ProductsService) { }

  ngOnInit() {
    this.getAllProducts()
  }

  getAllProducts() {

    this._subscription = this._productsService.getAllProducts().subscribe({
      next: (res) => {
        this.products = res.data;
        this.minPrice = Math.min(...this.products.map(product => product.price));
        this.maxPrice = Math.max(...this.products.map(product => product.price));
        this.rangeValues = [this.minPrice, this.maxPrice];
        this.filterProductsByPrice();
        this.updatePaginatedProducts();
      },
      error: (err) => {
        console.log(err);

      },
      complete: () => {
        console.log("Got Products");
      },
    });

  }


  paginateProducts(page: number) {
    this.currentPageProducts = page;
    this.updatePaginatedProducts();
  }

  updatePaginatedProducts() {
    const start = this.currentPageProducts * this.rows;
    const end = start + this.rows;
    this.paginatedProducts = this.products.slice(start, end);


  }




  sortByNameAtoZ() {
    this.products.sort((a, b) => a.title.localeCompare(b.title));
    this.updatePaginatedProducts();
    this.active = "active"
  }

  sortByNameZtoA() {
    this.products.sort((a, b) => b.title.localeCompare(a.title));
    this.updatePaginatedProducts();
  }

  sortByPriceLowtoHigh(){
    this.products.sort((a,b)=> a.price - b.price);
    this.updatePaginatedProducts()
  }
  sortByPriceHightoLow(){
    this.products.sort((a,b)=> b.price - a.price);
    this.updatePaginatedProducts()
  }

  filterProductsByPrice() {
    const [minPrice, maxPrice] = this.rangeValues;

    this.filteredProducts = this.products.filter(product => {
      const productPrice = Number(product.price);
      return productPrice >= minPrice && productPrice <= maxPrice;
    });
    // this.paginatedProducts = this.filteredProducts;
    this.paginatedProducts = this.filteredProducts.slice(this.start, this.start + this.rows);

    console.log('Filtered Products:', this.paginatedProducts);

  }




  onSearchChange(event: any) {
    const query = event.target.value.toLowerCase();
    this.filteredProducts = this.products.filter(product => product.title.toLowerCase().includes(query));
  }
  selectProduct(product: any) {
    console.log('Selected product:', product);  // Log the entire event object

    // Now use the appropriate property to filter the products
    const selectedTitle = product?.title;

    if (selectedTitle) {
      this.filteredProducts = this.products.filter(product => product.title === selectedTitle);
      this.paginatedProducts = this.filteredProducts.slice(0, this.rows);
    } else {
      console.warn('Product title is undefined');
    }  }





  ngOnDestroy() {
    if (this._subscription) {
      this._subscription.unsubscribe();
    }
  }
}
