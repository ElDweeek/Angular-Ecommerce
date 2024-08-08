import { Component } from '@angular/core';

import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { CartService } from '../../services/Cart/cart.service';
import { DeleteProductCartService } from '../../services/Cart/delete-product-cart.service';
import { Product } from '../../interfaces/product/product.interface';



@Component({
  selector: 'cart',
  standalone: true,
  imports: [ConfirmDialogModule,ToastModule,ButtonModule],
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

export class CartComponent {
  position: string = 'center';
  cartProducts:any[] = []
  data={}
  numOfCartItems:number=0
  totalPrice:number=0
  constructor(private _cartServic: CartService,private _deleteService:DeleteProductCartService,private confirmationService: ConfirmationService, private messageService: MessageService) {

    this.getCart()


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
            this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'delted' });
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
