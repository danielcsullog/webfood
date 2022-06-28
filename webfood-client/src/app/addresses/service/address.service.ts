import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserAddress } from '../../core/user.address';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  addressToEdit?: UserAddress;

  constructor(
    private httpClient: HttpClient
  ) { }

  async getAddresses(): Promise<UserAddress[]> {
    this.addressToEdit = undefined;
    return (
      this.httpClient.get('/api/users/addresses') as Observable<UserAddress[]>
    ).toPromise();
  }

  async getAddress(id: number): Promise<UserAddress | undefined> {
    return (
      this.httpClient.get(`/api/users/addresses/${id}`) as Observable<UserAddress>
    ).toPromise();
  }

  async createAddress(userAddress: UserAddress): Promise<UserAddress | undefined> {
    if (this.addressToEdit) {
      await this.deleteAddress(this.addressToEdit);
    }

    this.addressToEdit = undefined;

    const createdAddress = await (
      this.httpClient.post('/api/users/addresses', userAddress) as Observable<UserAddress>
    ).toPromise();

    return createdAddress;
  }

  async deleteAddress(userAddress: UserAddress): Promise<UserAddress> {
    return (
      this.httpClient.delete(`/api/users/addresses/${userAddress.id}`) as Observable<UserAddress>
    ).toPromise();
  }

  setAddressToEdit(address: UserAddress | undefined) {
    this.addressToEdit = address;
  }
}
