import { Injectable } from '@angular/core';
import { OrderItem } from '../../../app/core/order.item';
import { Restaurant } from '../../../app/core/restaurant';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  restaurant?: Restaurant;
  cartItems: OrderItem[] = [];

  constructor() { }

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
}
