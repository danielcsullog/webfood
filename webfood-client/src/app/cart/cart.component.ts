import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { OrderItem } from '../core/order.item';
import { Restaurant } from '../core/restaurant';
import { CartService } from './service/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<CartComponent>,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
  }

  closeDialog() {
    this.dialogRef.close();
  }

  getCartItems(): OrderItem[] {
    return this.cartService.cartItems;
  }

  getCartRestaurant(): Restaurant | undefined {
    return this.cartService.restaurant;
  }

  removeItem(orderItem: OrderItem) {
    this.cartService.removeOrderItemFromCart(orderItem);
  }

  removeAllItems() {
    this.cartService.clearCart();
  }

  getTotalPrice(): number {
    return this.cartService.calculateTotalPrice();
  }

  getNumberOfItems(): number {
    return this.cartService.countNumberOfItems();
  }

  increaseAmount(orderItem: OrderItem) {
    if (orderItem.amount < 20) {
      orderItem.amount++;
    }
  }

  lowerAmount(orderItem: OrderItem) {
    if (orderItem.amount > 1) {
      orderItem.amount--;
    }
  }
}
