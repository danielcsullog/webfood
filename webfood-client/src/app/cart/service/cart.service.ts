import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Order } from 'src/app/core/order';
import { UserAddress } from 'src/app/core/user.address';
import { OrderItem } from '../../../app/core/order.item';
import { Restaurant } from '../../../app/core/restaurant';
import { CartComponent } from '../cart.component';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  restaurant?: Restaurant;
  cartItems: OrderItem[] = [];
  comment = "";
  deliveryAddress!: UserAddress;

  constructor(
    private httpClient: HttpClient
  ) {

  }

  addOrderItemToCart(orderItem: OrderItem) {
    const resultItem = this.cartItems.find((item) => {
      return item.meal.id === orderItem.meal.id;
    })

    if (resultItem) {
      resultItem.amount += orderItem.amount;
    } else {
      this.cartItems.push(orderItem);
    }
  }

  removeOrderItemFromCart(orderItem: OrderItem) {
    const orderIndex = this.cartItems.indexOf(orderItem);
    if (orderIndex > -1) {
      this.cartItems.splice(orderIndex, 1);
    }
  }

  clearCart() {
    this.restaurant = undefined;
    this.cartItems = [];
  }

  setRestaurant(restaurant: Restaurant) {
    if (restaurant.id != this.restaurant?.id) {
      console.log("new restaurant name: " + restaurant.name);
      this.restaurant = restaurant;
    }
  }

  isCartRestaurantSimilarToMealRestaurant(
    restaurant: Restaurant
  ): boolean {
    if (this.restaurant && this.restaurant?.id != restaurant.id) {
      return false;
    } else {
      return true;
    }
  }

  calculateTotalPrice(): number {
    let total = 0;
    for (let item of this.cartItems) {
      total += item.meal.price * item.amount;
    }
    return total;
  }

  countNumberOfItems(): number {
    let count = 0;
    for (let item of this.cartItems) {
      count += item.amount
    }
    return count;
  }

  setAddress(userAddress: UserAddress) {
    this.deliveryAddress = userAddress;
    console.log(this.deliveryAddress.id);
  }

  async sendOrder(): Promise<Order | undefined> {
    if (this.restaurant && this.cartItems.length > 0 && this.deliveryAddress) {
      const order: Order = {
        restaurant: this.restaurant,
        orderItems: this.cartItems,
        userAddress: this.deliveryAddress,
        comment: this.comment
      }

      const createdOrder = await (
        this.httpClient.post(
          '/api/orders',
          order
        ) as Observable<Order>
      ).toPromise();
      this.clearCart();
      return createdOrder;
    } else {
      return;
      //toltse ki helyesen a dolgokat, es visszadob
    }
  }
}
