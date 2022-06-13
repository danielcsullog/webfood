import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { UserAddress } from '../core/user.address';

@Component({
  selector: 'app-addresses-editor',
  templateUrl: './addresses-editor.component.html',
  styleUrls: ['./addresses-editor.component.scss']
})
export class AddressesEditorComponent implements OnInit {
  addressForm: FormGroup = this.fb.group({
    zipCode: ['', [
      Validators.required,
    ]],
    city: ['', [
      Validators.required,
    ]],
    street: ['', [
      Validators.required,
    ]],
    houseNumber: ['', [
      Validators.required,
    ]],
    staircase: [''],
    doorbell: [''],
    floor: [''],
    doorNumber: [''],
    note: [''],
  })


  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
  }

  submit() {
    if (!this.addressForm.valid) {
      this.addressForm.markAllAsTouched();
      return;
    }
    console.log(this.addressForm.value as UserAddress);
  }

  get zipCode(): FormControl {
    return this.addressForm.get('zipCode') as FormControl;
  }

  get city(): FormControl {
    return this.addressForm.get('city') as FormControl;
  }

  get street(): FormControl {
    return this.addressForm.get('street') as FormControl;
  }

  get houseNumber(): FormControl {
    return this.addressForm.get('houseNumber') as FormControl;
  }

  get staircase(): FormControl {
    return this.addressForm.get('staircase') as FormControl;
  }

  get doorbell(): FormControl {
    return this.addressForm.get('doorbell') as FormControl;
  }

  get floor(): FormControl {
    return this.addressForm.get('floor') as FormControl;
  }

  get doorNumber(): FormControl {
    return this.addressForm.get('doorNumber') as FormControl;
  }

  get note(): FormControl {
    return this.addressForm.get('note') as FormControl;
  }
}
