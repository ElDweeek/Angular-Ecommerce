import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../services/category/categories.service';
import { BrandsService } from '../../services/brand/brands.service';
import { ProductsService } from '../../services/products/products.service';

import { Brand, Category, Product } from '../../interfaces/product/product.interface';

import { SingleProductComponent } from "../../components/single-product/single-product.component";
import { LoaderComponent } from "../../components/loader/loader.component";

import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';


@Component({
  selector: 'home',
  standalone: true,
  imports: [SingleProductComponent, LoaderComponent, CarouselModule, ButtonModule, TagModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  products: Array<Product> = [];
  limit: number = 10;
  page: number = 0;
  categories: Array<Category> = [];
  brands: Array<Brand> = [];

  isLoading: boolean = true;

  // responsiveOptions: any[] | undefined;


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
  constructor(
    private _productService: ProductsService,
    private _categoryService: CategoriesService,
    private _brandsService: BrandsService
  ) { }

  ngOnInit(): void {
    this.getStreamOfProducts();
    this.getAllCategories();
    this.getAllBrands();
  }

  getStreamOfProducts() {
    this._productService.getStreamOfProducts(this.limit, this.page).subscribe({
      next: (res) => {
        // console.log(res);
        this.products = [...this.products, ...res.data];
        this.page++
        this.isLoading = false;
      },
      error: (err) => {
        console.log(err);
        this.isLoading = false;
      },
      complete: () => {
        console.log('Got New 10 Products');
      }
    });
  }

  getAllCategories() {
    this._categoryService.getAllCategories().subscribe({
      next: (res) => {
        this.categories = res.data;
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log("Got All Categoreis");

      }
    })
  }

  getAllBrands() {
    this._brandsService.getAllBrands().subscribe({
      next:(res) => {
        this.brands = res.data;
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log("Got All Brands");

      }
    })
  }

}
