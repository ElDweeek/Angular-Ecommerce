import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { ProductsComponent } from './pages/products/products.component';
import { Err404Component } from './pages/err404/err404.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { SigninSignupComponent } from './pages/signin-signup/signin-signup.component';
import { UserSettingComponent } from './components/user-setting/user-setting.component';
import { CartComponent } from './pages/Cart/cart.component';
import { ShippingAddressesComponent } from './components/shipping-addresses/shipping-addresses.component';

import { ChangePassComponent } from './components/change-pass/change-pass.component';
import { authGuard } from './auth.guard';

import { WishListComponent } from './pages/wish-list/wish-list.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'contact',
    component: ContactUsComponent,
  },
  {
    path: 'products',
    canActivate: [authGuard],
    component: ProductsComponent,
  },
  {
    path: 'products/:id',
    canActivate: [authGuard],
    component: ProductDetailsComponent,
  },
  {
    path: 'settings',
    canActivate: [authGuard],
    component: UserSettingComponent,
    children: [
      // {
      //   path: 'wishlist',
      //   component: wishlistComponent,
      // },
      {
        path: 'address',
        component: ShippingAddressesComponent,
      },
      {
        path: 'updatePassword',
        component: ChangePassComponent,
      },
      {
        path: '',
        redirectTo: 'settings',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'signin',
    component: SigninSignupComponent,
  },
  {
    path: 'cart',
    component: CartComponent,
  },
  {
    path: 'wish-list',
    component: WishListComponent,
  },

  {
    path: '**',
    component: Err404Component,
  },
];
