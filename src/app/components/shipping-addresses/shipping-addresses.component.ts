import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { AuthorizationService } from '../../services/users/authorization.service';

@Component({
  selector: 'shipping-addresses',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './shipping-addresses.component.html',
  styleUrl: './shipping-addresses.component.scss',
})
export class ShippingAddressesComponent implements OnInit {
  form: FormGroup;
  successMsg: string = '';
  failedMsg: string = '';
  constructor(
    private fb: FormBuilder,
    private _authorizationService: AuthorizationService
  ) {}
  ngOnInit(): void {
    this.form = this.fb.group({
      contacts: this.fb.array([this.createContact()]),
    });
  }
  addressForm: FormGroup = new FormGroup({
    contacts: this.fb.array([this.createContact()]),
  });
  get contacts(): FormArray {
    return this.form.get('contacts') as FormArray;
  }

  createContact(): FormGroup {
    return this.fb.group({
      name: '',
      details: '',
      phone: '',
      city: '',
    });
  }

  addAddress(): void {
    this.successMsg = '';
    this.contacts.push(this.createContact());
  }

  removeAddress(index: number): void {
    this.contacts.removeAt(index);
  }
  addUserAddress() {
    console.log(this.form.value);
    this.successMsg = '';
    const flattenedContacts = this.contacts.value;
    this._authorizationService.addAddresses(flattenedContacts).subscribe({
      next: (res) => {
        this.successMsg = res.message;
        console.log(res);
      },
      error: (err) => {
        this.failedMsg = err.error.message;
        console.error(err);
      },
      complete: () => {
        console.log('Address addition process completed.');
      },
    });
  }
  deleteAddresses() {
    this.successMsg = '';
    this._authorizationService.getUserAddresses().subscribe({
      next: (res) => {
        const addresses = res.data;
        if (addresses.length > 0) {
          let lastAddressId = addresses[addresses.length - 1]._id;

          this._authorizationService.removeAddress(lastAddressId).subscribe({
            next: (res) => {
              this.successMsg = res.message;

              console.log(res);
            },
            error: (err) => {
              this.failedMsg = err.error.message;
              console.error(err);
            },
            complete: () => {
              console.log('Address delete process completed.');
            },
          });
        }
      },
    });
  }
  flattenContacts(contacts: FormArray): any[] {
    return contacts.controls.map((control) => control.value);
  }
  // getAddresses() {

  //   this._authorizationService.getUserAddresses().subscribe({
  //     next: (res) => {

  //       console.log('Address retrieve successfully:', res);

  //     },
  //     error: (err) => {

  //       console.error('Failed to retrieve address:', err);

  //     },
  //     complete: () => {

  //       console.log('Address addition process completed.');
  //     },
  //   });
  // }
  // loadAddresses(): void {
  //   this._authorizationService.getUserAddresses().subscribe({
  //     next: (res) => {
  //       // Assuming the API response is an array of addresses
  //       const addresses = res?.data || []; // Adjust based on actual API response structure

  //       // Clear existing contacts
  //       this.contacts.clear();

  //       // Add the fetched addresses to the form
  //       addresses.forEach((address: any) => {
  //         this.contacts.push(this.createContact(address));
  //       });
  //     },
  //     error: (err) => {
  //       console.error('Failed to fetch addresses:', err);
  //       // Optionally, handle error response here
  //     },
  //     complete: () => {
  //       console.log('Addresses fetched successfully.');
  //     },
  //   });
  // }
}
