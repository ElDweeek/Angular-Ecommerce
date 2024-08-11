import { Component } from '@angular/core';
import { AuthorizationService } from '../../services/users/authorization.service';
import { RouterLink, RouterOutlet } from '@angular/router';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'user-setting',
  standalone: true,
  imports: [RouterLink, RouterOutlet,SidebarModule, ButtonModule],
  templateUrl: './user-setting.component.html',
  styleUrl: './user-setting.component.scss',
})
export class UserSettingComponent {

  sidebarVisible: boolean = false;


  constructor(private _authorizationService: AuthorizationService) {}
  logOut() {
    this._authorizationService.logOut();
  }
  links(event: Event) {
    const target = event.target as HTMLElement;
    if (target && target.classList.contains('list-group-item')) {
      // Remove active class from all links
      const items = document.querySelectorAll('.list-group-item');
      items.forEach((item) => item.classList.remove('active'));

      // Add active class to the clicked link
      target.classList.add('active');
    }
  }
}
