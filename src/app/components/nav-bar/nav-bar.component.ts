import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthorizationService } from '../../services/users/authorization.service';

@Component({
  selector: 'nav-bar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
})
export class NavBarComponent {
  Logo = 'assets/images/LOGO.png';
  isLoggedIn = false;
  username: string;

  constructor(private _authorizationService: AuthorizationService) {
    _authorizationService.loggedIn.subscribe((res) => {
      if (res) {
        this.isLoggedIn = res ? true : false;
        this.username = localStorage
          .getItem('username')
          .split('')
          .slice(1, 3)
          .join('')
          .toUpperCase();
      } else {
        this.isLoggedIn = false;
      }
    });
  }
}
