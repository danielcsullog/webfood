import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { UserAddress } from '../../core/user.address';
import { AddressService } from '../service/address.service';

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
    private addressService: AddressService
  ) { 
  
  }

  ngOnInit(): void {
    if(this.addressService.addressToEdit){
      this.addressForm.get('zipCode')?.setValue(this.addressService.addressToEdit.zipCode);
      this.addressForm.get('city')?.setValue(this.addressService.addressToEdit.city);
      this.addressForm.get('street')?.setValue(this.addressService.addressToEdit.street);
      this.addressForm.get('houseNumber')?.setValue(this.addressService.addressToEdit.houseNumber);
      this.addressForm.get('staircase')?.setValue(this.addressService.addressToEdit.staircase);
      this.addressForm.get('doorbell')?.setValue(this.addressService.addressToEdit.doorbell);
      this.addressForm.get('floor')?.setValue(this.addressService.addressToEdit.floor);
      this.addressForm.get('doorNumber')?.setValue(this.addressService.addressToEdit.doorNumber);
      this.addressForm.get('note')?.setValue(this.addressService.addressToEdit.note);
    } 
  }

  submit() {
    //if (!this.addressForm.valid) {
    //  this.addressForm.markAllAsTouched();
    //  return;
   // }
    //TODO: DeleteOldEntryIfExistsAddNewEntry
    console.log(this.addressForm.value as UserAddress);
    this.addressForm.reset();
    //show dialog: modified address done
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
