import { Component, OnInit } from '@angular/core';

import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { CartService } from '../../services/Cart/cart.service';
import { DeleteProductCartService } from '../../services/Cart/delete-product-cart.service';
import { UpdatProductCartService } from '../../services/Cart/updat-product-cart.service';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from "../../components/loader/loader.component";




@Component({
  selector: 'cart',
  standalone: true,
  imports: [ConfirmDialogModule, ToastModule, ButtonModule, CommonModule, LoaderComponent],
templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
  providers:[ConfirmationService,MessageService],

  animations: [
    trigger('fadeInOut', [
      state('void', style({ opacity: 0 })),
      transition(':enter, :leave', [animate(300)])
    ])
  ]
})

export class CartComponent  implements OnInit{
  position: string = 'center';
  cartProducts:any[] = []
  data={}
  numOfCartItems:number=0
  totalPrice:number=0;
  isLoading=true;

  constructor(private _cartServic: CartService,private _deleteService:DeleteProductCartService,private confirmationService: ConfirmationService, private messageService: MessageService,private _updateService:UpdatProductCartService) {

  }

  ngOnInit(): void {
    this.getCart();
  }


  getCart(){
    this._cartServic.getCartProducts().subscribe(
      {
        next: (res) => {
          this.cartProducts=res.data.products
          this.totalPrice=res.data.totalCartPrice
          this.data=res.data
          this.numOfCartItems=res.numOfCartItems
          console.log(res.data);
        },
        error: (err) => {
          console.log(err);

        },
        complete: () => {
          console.log("get cart products");
        }
      }
    )
  }
  updateCartItem(prodId: string, newCount: number) {
    if (newCount < 1) return;
    this._updateService.updateCart(prodId, newCount).subscribe({
      next: (res) => {
        console.log(res);

        this.getCart();
      },
      error: (err) => {
        console.error(err);

      }
    });
  }

  confirmPosition(position: string,prodID:string) {
    this.position = position;

    this.confirmationService.confirm({
        message: 'Are you sure you want to delete this product from your cart?',
        header: 'Confirmation',
        icon: 'pi pi-info-circle',
        acceptIcon:"none",
        rejectIcon:"none",
        rejectButtonStyleClass:"p-button-text",
        accept: () => {
            this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'deleted' });
            this.deleteCartProd(prodID)
        } ,
        key: 'positionDialog'
    });
}
  deleteCartProd(productId:string){

    this._deleteService.deletProduct(productId).subscribe(
      {
        next: (res) => {
            this.getCart()
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

// navigateToHome() {
//   this.router.navigate(['/home']);
// }
}
