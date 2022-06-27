import { Component, OnInit } from '@angular/core';
import { OrderItem } from 'src/app/core/order.item';
import { CartService } from '../service/cart.service';

@Component({
  selector: 'app-cart-items',
  templateUrl: './cart-items.component.html',
  styleUrls: ['./cart-items.component.scss']
})
export class CartItemsComponent implements OnInit {

  constructor(
    private cartService: CartService
  ) { }

  ngOnInit(): void {
  }

  getCartItems(): OrderItem[] {
    return this.cartService.cartItems;
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
