import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CartService } from '../service/cart.service';

@Component({
  selector: 'app-cart-restaurant-warn',
  templateUrl: './cart-restaurant-warn.component.html',
  styleUrls: ['./cart-restaurant-warn.component.scss']
})
export class CartRestaurantWarnComponent implements OnInit {

  constructor(
    private cartService: CartService,
    private cartRestaurantWarnDialogRef: MatDialogRef<CartRestaurantWarnComponent>
  ) { }

  ngOnInit(): void {
  }

  closeDialog() {
    this.cartRestaurantWarnDialogRef.close();
  }

}
