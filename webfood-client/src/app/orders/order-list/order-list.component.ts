import { Component, OnInit } from '@angular/core';
import { Order } from '../../core/order';
import { OrderService } from '../service/order.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {

  orders: Order[] = [];

  constructor(
    private orderService: OrderService,
  ) { }

  async ngOnInit(): Promise<void> {
    this.orders = await this.orderService.getOrders();
    this.orders.reverse();
  }

  isOrderStatusNotCompleted(order: Order): boolean {
    if (order.orderStatus != "DONE") {
      return true;
    } else {
      return false;
    }
  }
}
