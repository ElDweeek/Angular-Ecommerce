import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidatorFn,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthorizationService } from '../../services/users/authorization.service';

@Component({
  selector: 'change-pass',
  standalone: true,
  imports: [ReactiveFormsModule],

  templateUrl: './change-pass.component.html',
  styleUrl: './change-pass.component.scss',
})
export class ChangePassComponent {
  updatePassForm: FormGroup = new FormGroup(
    {
      currentPassword: new FormControl('', [Validators.required]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$'),
      ]),
      rePassword: new FormControl('', [Validators.required]),
    },
    {
      validators: [this.match('password', 'rePassword')],
    }
  );
  updateErrMsg: string = '';
  updateSuccMsg: string = '';
  isLoading: boolean = false;

  constructor(private _authorizationService: AuthorizationService) {}

  match(controlName: string, checkControlName: string): ValidatorFn {
    return (controls: AbstractControl) => {
      const control = controls.get(controlName);
      const checkControl = controls.get(checkControlName);

      if (checkControl?.errors && !checkControl.errors['matching']) {
        return null;
      }

      if (control?.value !== checkControl?.value) {
        controls.get(checkControlName)?.setErrors({ matching: true });
        return { matching: true };
      } else {
        return null;
      }
    };
  }

  updatePass() {
    this.updateErrMsg = '';
    this.updateSuccMsg = '';
    if (this.updatePassForm.valid === false) {
      this.updatePassForm.markAllAsTouched();
    } else {
      this.isLoading = true;
      this._authorizationService
        .getUserCurrentPass(this.updatePassForm.value)
        .subscribe({
          next: (res: any) => {
            console.log(res);
            this.isLoading = false;
            this.updateSuccMsg = 'Password updated successfully';
            this.updatePassForm.reset();
          },
          error: (err) => {
            console.log(err);
            this.isLoading = false;

            this.updateErrMsg = err.error.message;
          },
        });
    }
  }

  // //////////////////////////////////////////////
  // register() {
  //   this.successRegMsg = '';
  //   this.registerErrMsg = '';
  //   if (this.registerForm.valid === false) {
  //     this.registerForm.markAllAsTouched();
  //   } else {
  //     this.isLoading = true;

  //     this._authorizationService.signUp(this.registerForm.value).subscribe({
  //       next: (res: any) => {
  //         console.log(res);
  //         this.successRegMsg = 'Registration successful. Please login.';
  //         this.isLoading = false;
  //         this.registerForm.reset();
  //         this.router.navigate(['/signin']);
  //       },
  //       error: (err) => {
  //         console.log(err);

  //         this.registerErrMsg = err.error.message;
  //         this.isLoading = false;
  //       },
  //     });
  //   }
  // }
}
