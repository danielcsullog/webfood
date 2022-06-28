import { Component, Input, OnInit } from '@angular/core';
import { Order } from 'src/app/core/order';
import { Restaurant } from 'src/app/core/restaurant';
import { RestaurantService } from 'src/app/restaurants/service/restaurant.service';
import { MyRestaurantService } from '../service/my-restaurant.service';

@Component({
  selector: 'app-my-restaurant-landing',
  templateUrl: './my-restaurant-landing.component.html',
  styleUrls: ['./my-restaurant-landing.component.scss']
})
export class MyRestaurantLandingComponent implements OnInit {

  userRestaurants: Restaurant[] = [];
  workPlaces: Restaurant[] = [];

  constructor(
    private myRestaurantService: MyRestaurantService,
  ) { }

  async ngOnInit(): Promise<void> {
    this.userRestaurants = await this.myRestaurantService.getUserRestaurants();
    this.workPlaces = await this.myRestaurantService.getWorkPlaces();
  }

  getEmployeesCount(restaurant: Restaurant) {
    return restaurant.workers?.length;
  }

  async getOrders(restaurant: Restaurant): Promise<Order[]> {
    const orders = await this.myRestaurantService.getRestaurantOrders(restaurant);
    return orders;
  }

  openNewReqDialog() {
    
  }

}
