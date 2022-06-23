import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserAddress } from 'src/app/core/user.address';
import { Order } from '../../core/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  
  constructor(
    private httpClient: HttpClient
  ) { }

  async getOrders(): Promise<Order[]> {
    return (
      this.httpClient.get('/api/orders') as Observable<Order[]>
    ).toPromise();
  }
  
  async getOrderUserAddressFromId(userAddressId: number): Promise<UserAddress> {
    return (
      this.httpClient.get('/api/users/addresses/' + userAddressId) as Observable<UserAddress>
    ).toPromise();
  }

}
