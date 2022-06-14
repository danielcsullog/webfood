import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { UserAddress } from '../../core/user.address';
import { AddressService } from '../service/address.service';

@Component({
  selector: 'app-address-summary',
  templateUrl: './address-summary.component.html',
  styleUrls: ['./address-summary.component.scss']
})
export class AddressSummaryComponent implements OnInit {
  
  @Input() userAddress!: UserAddress;
  @Input() showButtons: boolean = false;

  @Output() editAddress: EventEmitter<void> = new EventEmitter();

  constructor(
    private addressService: AddressService,
  ) { }

  ngOnInit(): void {
    console.log(this.userAddress);
  }

  edit() {
    //this.editAddress.emit();
    this.addressService.setAddressToEdit(this.userAddress);
    
  }
}
