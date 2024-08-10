import { Component, OnInit, OnDestroy } from '@angular/core';
import { CategoriesService } from '../../services/category/categories.service';
import { BrandsService } from '../../services/brand/brands.service';
import { ProductsService } from '../../services/products/products.service';

import { Brand, Category, Product } from '../../interfaces/product/product.interface';

import { SingleProductComponent } from "../../components/single-product/single-product.component";
import { LoaderComponent } from "../../components/loader/loader.component";

import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { PaginatorComponent } from '../../components/paginator/paginator.component';
import { AdsBannerComponent } from "../../components/ads-banner/ads-banner.component";
import { Subscription } from 'rxjs';

@Component({
  selector: 'home',
  standalone: true,
  imports: [SingleProductComponent, LoaderComponent, CarouselModule, ButtonModule, TagModule, PaginatorComponent, AdsBannerComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  products: Array<Product> = [];
  limit: number = 10;
  page: number = 1;
  hasMoreData: boolean = true;
  //---------------------
  categories: Array<Category> = [];
  //---------------------
  brands: Array<Brand> = [];
  //---------------------
  paginatedCategories: Array<Category> = [];
  paginatedBrands: any[] = [];
  // paginatedProducts: any[] = [];
  rows: number = 5;
  currentPageCategories: number = 0;
  currentPageBrands: number = 0;
  //---------------------
  categoriesHeader: string = "Our Categories"
  brandsHeader: string = "Our Brands"
  productsHeader: string = "All Products"
  //---------------------
  isLoading: boolean = true;

  responsiveOptions = [
    {
      breakpoint: '1199px',
      numVisible: 5,
      numScroll: 5
    },
    {
      breakpoint: '991px',
      numVisible: 3,
      numScroll: 3
    },
    {
      breakpoint: '767px',
      numVisible: 2,
      numScroll: 2
    },
    {
      breakpoint: '540px',
      numVisible: 1,
      numScroll: 1
    }
  ];

  private _subscription!: Subscription
  constructor(
    private _productService: ProductsService,
    private _categoryService: CategoriesService,
    private _brandsService: BrandsService,
  ) { }

  ngOnInit(): void {
    this.getStreamOfProducts();
    this.getAllCategories();
    this.getAllBrands();
  }

  getStreamOfProducts() {

    this._subscription = this._productService.getStreamOfProducts(this.limit, this.page).subscribe({
      next: (res) => {
        this.products = [...this.products, ...res.data];
        this.isLoading = false;

        this.page++;
        this.hasMoreData = res.data.length === this.limit;

        // console.log(this.products);
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


  getAllCategories() {
    this._categoryService.getAllCategories().subscribe({
      next: (res) => {
        this.categories = res.data;
        this.updatePaginatedCategories();
        this.isLoading = false;

      },
      error: (err) => {
        console.log(err);
        this.isLoading = false;

      },
      complete: () => {
        console.log("Got All Categories");
      }
    });
  }

  getAllBrands() {
    this._brandsService.getAllBrands().subscribe({
      next: (res) => {
        this.brands = res.data;
        this.isLoading = false;

        this.updatePaginatedBrands();
      },
      error: (err) => {
        console.log(err);
        this.isLoading = false;

      },
      complete: () => {
        console.log("Got All Brands");
      }
    });
  }

  paginateCategories(page: number) {
    this.currentPageCategories = page;
    this.updatePaginatedCategories();
  }

  updatePaginatedCategories() {
    const start = this.currentPageCategories * this.rows;
    const end = start + this.rows;
    this.paginatedCategories = this.categories.slice(start, end);
  }

  paginateBrands(page: number) {
    this.currentPageBrands = page;
    this.updatePaginatedBrands();
  }

  updatePaginatedBrands() {
    const start = this.currentPageBrands * this.rows;
    const end = start + this.rows;
    this.paginatedBrands = this.brands.slice(start, end);
  }


  ngOnDestroy() {
    if (this._subscription) {
      this._subscription.unsubscribe();
    }
  }



}
