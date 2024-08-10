import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from "../../components/loader/loader.component";
import { WishListService } from '../../services/WishList/get-user-wishlist.service';
import { DeleteProductWishListService } from '../../services/WishList/delete-product-wish-list.service';
import { AddProductService } from '../../services/Cart/add-product.service';



@Component({
  selector: 'wish-list',

  standalone: true,
  imports: [ConfirmDialogModule, ToastModule, ButtonModule, CommonModule, LoaderComponent],
  templateUrl: './wish-list.component.html',
  styleUrl: './wish-list.component.scss',
  providers:[ConfirmationService,MessageService],

  animations: [
    trigger('fadeInOut', [
      state('void', style({ opacity: 0 })),
      transition(':enter, :leave', [animate(300)])
    ])
  ]
})

export class WishListComponent implements  OnInit {
  position: string = 'center';
  whishListProducts:any[] = []
  data={}
  numOfCartItems:number=0

  isLoading=true;

  constructor(private _wishListService: WishListService,private _deleteWishListProd:DeleteProductWishListService,private _addToCart:AddProductService ,private confirmationService: ConfirmationService, private messageService: MessageService) {

  }

  ngOnInit(): void {
    this.getWishList()

  }

  getWishList(){
    this._wishListService.getWishListProduct().subscribe(
      {
        next: (res) => {
          this.whishListProducts=res.data
          this.data=res.data
          this.numOfCartItems=res.count
          console.log(res);
        },
        error: (err) => {
          console.log(err , "err get wish list prodcuts");

        },
        complete: () => {
          console.log("get wish list  products");
        }
      }
    )
  }


  confirmPosition(position: string,prodID:string) {
    this.position = position;

    this.confirmationService.confirm({
        message: 'Are you sure you want to delete this product from your wish list ?',
        header: 'Confirmation',
        icon: 'pi pi-info-circle',
        acceptIcon:"none",
        rejectIcon:"none",
        rejectButtonStyleClass:"p-button-text",
        accept: () => {
            this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'deleted' });
            this.deleteWishListProduct(prodID)
        } ,
        key: 'positionDialog'
    });
}
deleteWishListProduct(productId:string){

  this._deleteWishListProd.deleteWishListProduct(productId).subscribe(
    {
      next: (res) => {
          this.getWishList()
          this.isLoading=false;
      },
      error: (err) => {
        console.log(err);
        this.isLoading=false
      },
      complete: () => {
        console.log("completed");
      }
    }
  )

}
addToCartRemoveFromWishList(prodId:string){
        this.deleteWishListProduct(prodId);
        this._addToCart.addToCart(prodId).subscribe(
          {
            next: (res) => {
              console.log(res);
            },
            error: (err) => {
              console.log(err);

            },
            complete: () => {
              console.log("completed");
            }
          }
        )

}

}
