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
    return (
      this.httpClient.get('/api/users/addresses') as Observable<UserAddress[]>
    ).toPromise();
  }

  async getAddress(id: number): Promise<UserAddress | undefined> {
    return (
      this.httpClient.get(`/api/users/addresses/${id}`) as Observable<UserAddress>
    ).toPromise();
  }

  setAddressToEdit(address: UserAddress | undefined) {
    this.addressToEdit = address;
  }
}
