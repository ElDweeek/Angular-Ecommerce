import { Component, inject, NgModule, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthorizationService } from './../../services/users/authorization.service';

import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'signin-signup',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signin-signup.component.html',
  styleUrl: './signin-signup.component.scss',
})
export class SigninSignupComponent {
  signUpClass: string = '';

  router = inject(Router);
  isLoading: boolean = false;
  registerErrMsg: string = '';
  loginErrMsg: string = '';
  successRegMsg: string = '';

  constructor(private _authorizationService: AuthorizationService) {}

  /*----------Registration Form ----------- */
  registerForm: FormGroup = new FormGroup(
    {
      name: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_]{5,15}$'),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [
        Validators.required,
        Validators.minLength(11),
        Validators.maxLength(11),
      ]),
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
  /*----------Login Form ----------- */

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),

    password: new FormControl('', [
      Validators.required,
      // Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$'),
    ]),
  });

  register() {
    this.successRegMsg = '';
    this.registerErrMsg = '';
    if (this.registerForm.valid === false) {
      this.registerForm.markAllAsTouched();
    } else {
      this.isLoading = true;

      this._authorizationService.signUp(this.registerForm.value).subscribe({
        next: (res: any) => {
          console.log(res);
          this.successRegMsg = 'Registration successful. Please login.';
          this.isLoading = false;
          this.registerForm.reset();
          this.router.navigate(['/signin']);
        },
        error: (err) => {
          console.log(err);
          this.registerErrMsg = err.error.message;
          this.isLoading = false;
        },
      });
    }
  }
  login() {
    if (this.loginForm.valid === false) {
      this.loginForm.markAllAsTouched();
    } else {
      this.loginErrMsg = '';
      this.isLoading = true;
      this._authorizationService.signIn(this.loginForm.value).subscribe({
        next: (res) => {
          console.log(res);
          this.isLoading = false;
          this.loginForm.reset();
          this._authorizationService.saveUserToken(res.token, res.user.name);
          this.router.navigate(['/home']);
        },
        error: (err) => {
          this.loginErrMsg = err.error.message;
          this.isLoading = false;
        },
      });
    }
  }

  // confirmPasswordValidator: ValidatorFn = (
  //   control: AbstractControl
  // ): ValidationErrors | null => {
  //   return control.value.password === control.value.confirmPassword
  //     ? null
  //     : { PasswordNoMatch: true };
  // };

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
  addSignUpClass() {
    this.signUpClass = 'sign-up-mode';
  }
  removeSignUpClass() {
    this.signUpClass = '';
  }
}

// old code below for reference:
// import { Component } from '@angular/core';
// import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
// import { UsersService } from '../../services/users/users.service';

// @Component({
//   selector: 'signin-signup',
//   standalone: true,
//   imports: [ReactiveFormsModule],
//   templateUrl: './signin-signup.component.html',
//   styleUrl: './signin-signup.component.scss'
// })
// export class SigninSignupComponent {
//   signUpClass: string = "";

//   registerForm: FormGroup = new FormGroup({
//     firstName: new FormControl(null,[Validators.required]),
//     lastName: new FormControl(null,[Validators.required]),
//     username: new FormControl(null,[Validators.required]),
//     email: new FormControl(null,[Validators.required]),
//     password: new FormControl(null,[Validators.required]),
//     rePassword: new FormControl(null,[Validators.required]),
//     gender: new FormControl(null,[Validators.required])
//   })

//   constructor(private userService: UsersService) {}

//   addUser() {
//     const newUser = {
//       firstName: 'John',
//       lastName: 'Doe',
//       email: 'john.doe@example.com',
//       password: 'password123',
//       username: 'johndoe',
//       gender: 'male' // including this for completeness
//     };

//     this.userService.addUser(newUser).subscribe({
//       next: (res) => {
//         console.log('User added:', res)
//       },
//       error: (err) => {
//         console.error('Error adding user:', err)
//       },
//       complete: ()=>{
//         console.log("User Added");

//       }
//     });
//   }

//   addSignUpClass(){
//     this.signUpClass = "sign-up-mode"
//   }
//   removeSignUpClass(){
//     this.signUpClass = ""
//   }
// }
