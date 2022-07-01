import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Order } from 'src/app/core/order';
import { Restaurant } from 'src/app/core/restaurant';
import { OrderService } from 'src/app/orders/service/order.service';
import { MyRestaurantService } from '../service/my-restaurant.service';

@Component({
  selector: 'app-my-restaurant-orders',
  templateUrl: './my-restaurant-orders.component.html',
  styleUrls: ['./my-restaurant-orders.component.scss']
})
export class MyRestaurantOrdersComponent implements OnInit {

  orders: Order[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {
      restaurant: Restaurant;
    },
    private myRestaurantService: MyRestaurantService,
    private orderService: OrderService
  ) { }

  async ngOnInit(): Promise<void> {
    this.orders = await this.myRestaurantService.getRestaurantOrders(this.data.restaurant);
    this.orders.reverse(),
    console.log(this.orders);
  }

  setOrderStatusDoing(order: Order) {
    order.orderStatus = "DOING";
    this.orderService.updateOrder(order);
  }

  setOrderStatusDone(order: Order) {
    order.orderStatus = "DONE";
    this.orderService.updateOrder(order);
  }
}
