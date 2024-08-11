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
import { TruncatePipe } from '../../pipes/truncate/truncate.pipe';
import { BraAndCatProductsComponent } from "../../components/bra-and-cat-products/bra-and-cat-products.component";


@Component({
  selector: 'products',
  standalone: true,
  imports: [CardModule, ButtonModule, SingleProductComponent, TopRatedProductsComponent, LoaderComponent, PaginatorComponent, SliderModule, AutoCompleteModule, FormsModule, TruncatePipe, BraAndCatProductsComponent],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {

  rangeValues: number[] = [];
  active: string = "";
  //---------------------------
  productsHeader: string = "All Products"
  products: Array<Product> = [];
  //-----------------------------
  productFound: any = '';
  filteredProducts: any[] = [];
  minPrice!: number
  maxPrice!: number
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

    const sourceArray = this.filteredProducts.length > 0 ? this.filteredProducts : this.products;

    this.paginatedProducts = sourceArray.slice(start, end);
  }

  sortByNameAtoZ() {
    this.products.sort((a, b) => a.title.localeCompare(b.title));
    this.filteredProducts = this.products;
    this.currentPageProducts = 0;
    this.updatePaginatedProducts();
  }

  sortByNameZtoA() {
    this.products.sort((a, b) => b.title.localeCompare(a.title));
    this.filteredProducts = this.products;
    this.currentPageProducts = 0;
    this.updatePaginatedProducts();
  }

  sortByPriceLowtoHigh() {
    this.products.sort((a, b) => a.price - b.price);
    this.filteredProducts = this.products;
    this.currentPageProducts = 0;
    this.updatePaginatedProducts();
  }

  sortByPriceHightoLow() {
    this.products.sort((a, b) => b.price - a.price);
    this.filteredProducts = this.products;
    this.currentPageProducts = 0;
    this.updatePaginatedProducts();
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

  searchForProduct(event: any) {
    const query = event.query.toLowerCase();

    if (!query) {
      this.filteredProducts = this.products;
    } else {
      this.filteredProducts = this.products.filter(product =>
        product.title.toLowerCase().includes(query)
      );
    }
    this.currentPageProducts = 0;
    this.updatePaginatedProducts();
  }


filterByQuery() {
  if (this.productFound) {
      let query: string;

      if (typeof this.productFound === 'string') {
          query = this.productFound.toLowerCase();
      } else if (this.productFound.title) {
          query = this.productFound.title.toLowerCase();
      }

      if (query) {
          this.filteredProducts = this.products.filter(product =>
              product.title.toLowerCase().includes(query)
          );
          this.updatePaginatedProducts();
      }
  }
}


  ngOnDestroy() {
    if (this._subscription) {
      this._subscription.unsubscribe();
    }
  }
}
