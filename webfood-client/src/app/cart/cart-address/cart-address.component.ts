import { Component, OnInit } from '@angular/core';
import { AddressService } from 'src/app/addresses/service/address.service';
import { UserAddress } from 'src/app/core/user.address';
import { CartService } from '../service/cart.service';

@Component({
  selector: 'app-cart-address',
  templateUrl: './cart-address.component.html',
  styleUrls: ['./cart-address.component.scss']
})
export class CartAddressComponent implements OnInit {

  addresses!: UserAddress[];
  selectedAddress!: UserAddress;

  constructor(
    private addressService: AddressService,
    private cartService: CartService
  ) { }

  async ngOnInit(): Promise<void> {
    this.addresses = await this.getAddresses();
  }

  async getAddresses(): Promise<UserAddress[]> {
    return await this.addressService.getAddresses();
  }

  setAddressForCartService() {
    //const address = await this.addressService.getAddress(this.selectedId);
    if (this.selectedAddress) {
      this.cartService.setAddress(this.selectedAddress);
    } else {

    }
  }
}
