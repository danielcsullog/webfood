import { Component, Input, OnInit } from '@angular/core';
import { Restaurant } from 'src/app/core/restaurant';
import { RestaurantService } from 'src/app/restaurants/service/restaurant.service';
import { Order } from '../../core/order';
import { OrderService } from '../service/order.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {

  @Input() order!: Order;

  restaurant!: Restaurant;

  constructor(
    private orderService: OrderService,
    private restaurantService: RestaurantService
  ) {
    
   }

  async ngOnInit(): Promise<void> {
    this.restaurant = await this.restaurantService.getRestaurant(this.order.restaurantId);
  }

}
