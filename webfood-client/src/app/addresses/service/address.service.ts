import { Injectable } from '@angular/core';
import { UserAddress } from '../../core/user.address';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  addresses: UserAddress[] = [
    {
      id: 1,
      zipCode: 5600,
      city: 'Bekescsaba',
      street: 'Nagy utca',
      houseNumber: 9,
      staircase: 1,
      doorbell: 20,
      floor: 5,
      doorNumber: 20,
      note: "You can go in with the #0910 code",
    }, {
      id: 2,
      zipCode: 1000,
      city: 'BP',
      street: 'Kis utca',
      houseNumber: 1,
      staircase: 0,
      doorbell: 0,
      floor: 0,
      doorNumber: 0,
      note: "Call me when you are here",
    }];

  addressToEdit?: UserAddress;

  constructor() { }

  async getAddresses(): Promise<UserAddress[]> {
    return this.addresses;
  }

  async getAddress(id: number): Promise<UserAddress | undefined> {
    return this.addresses.find(address => address.id === id);
  }

  setAddressToEdit(address: UserAddress | undefined) {
    this.addressToEdit = address;
  }
}
