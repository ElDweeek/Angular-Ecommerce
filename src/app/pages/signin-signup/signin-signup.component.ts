import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersService } from '../../services/users/users.service';

@Component({
  selector: 'signin-signup',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signin-signup.component.html',
  styleUrl: './signin-signup.component.scss'
})
export class SigninSignupComponent {
  signUpClass: string = "";

  registerForm: FormGroup = new FormGroup({
    firstName: new FormControl(null,[Validators.required]),
    lastName: new FormControl(null,[Validators.required]),
    username: new FormControl(null,[Validators.required]),
    email: new FormControl(null,[Validators.required]),
    password: new FormControl(null,[Validators.required]),
    rePassword: new FormControl(null,[Validators.required]),
    gender: new FormControl(null,[Validators.required])
  })



  constructor(private userService: UsersService) {}

  addUser() {
    const newUser = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: 'password123',
      username: 'johndoe',
      gender: 'male' // including this for completeness
    };

    this.userService.addUser(newUser).subscribe({
      next: (res) => {
        console.log('User added:', res)
      },
      error: (err) => {
        console.error('Error adding user:', err)
      },
      complete: ()=>{
        console.log("User Added");

      }
    });
  }





  addSignUpClass(){
    this.signUpClass = "sign-up-mode"
  }
  removeSignUpClass(){
    this.signUpClass = ""
  }
}
