import { Component } from '@angular/core';
import { AuthorizationService } from '../../services/users/authorization.service';

@Component({
  selector: 'user-setting',
  standalone: true,
  imports: [],
  templateUrl: './user-setting.component.html',
  styleUrl: './user-setting.component.scss',
})
export class UserSettingComponent {
  constructor(private _authorizationService: AuthorizationService) {}
  logOut() {
    this._authorizationService.logOut();
  }
}
