import { Component, OnInit } from '@angular/core';
import { UserAddress } from '../../core/user.address';
import { AddressService } from '../service/address.service';

@Component({
  selector: 'app-addresses-list',
  templateUrl: './addresses-list.component.html',
  styleUrls: ['./addresses-list.component.scss']
})
export class AddressesListComponent implements OnInit {

  addresses?: UserAddress[];

  constructor(
    private addressService: AddressService,
  ) { }

  async ngOnInit(): Promise<void> {
    this.addresses = await this.addressService.getAddresses();
  }

  clearForm() {
    this.addressService.setAddressToEdit(undefined);
  }

}
