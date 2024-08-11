import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthorizationService } from '../../services/users/authorization.service';
import { BadgeModule } from 'primeng/badge';
import { CartCountService } from '../../services/Cart/cart-count.service';
import { CartService } from '../../services/Cart/cart.service';
@Component({
  selector: 'nav-bar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive,BadgeModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
})
export class NavBarComponent implements OnInit {
  Logo = 'assets/images/LOGO.png';
  isLoggedIn = false;

  username: string;


  numberOfCartItems:number

  constructor(private _authorizationService: AuthorizationService,private _cartCountService:CartCountService,private _cartServic:CartService) {
    _authorizationService.loggedIn.subscribe((res) => {
      if (res) {
        this.isLoggedIn = res ? true : false;
        this.username = localStorage
          .getItem('username')
          .split('')
          .slice(1, 3)
          .join('')
          .toUpperCase();
          const storedCount = localStorage.getItem('numOfCartItems');
          this.numberOfCartItems = storedCount ? parseInt(storedCount) : 0;
          this._cartCountService.updateNumOfCartItems(this.numberOfCartItems)
          console.log(parseInt(storedCount));
          this.getCart()

      } else {
        this.isLoggedIn = false;
      }
    });


  }
  getCart(){
    this._cartServic.getCartProducts().subscribe(
      {
        next: (res) => {

          this.numberOfCartItems=res.numOfCartItems;
          this._cartCountService.updateNumOfCartItems(this.numberOfCartItems);

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
  ngOnInit(): void {
      this._cartCountService.cartCount$.subscribe((count) => {
      this.numberOfCartItems = count;

    });

   }

   
}
