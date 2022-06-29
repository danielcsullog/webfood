import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Order } from 'src/app/core/order';
import { Restaurant } from 'src/app/core/restaurant';
import { RequestEditorComponent } from 'src/app/request-editor/request-editor.component';
import { RestaurantService } from 'src/app/restaurants/service/restaurant.service';
import { MyRestaurantService } from '../service/my-restaurant.service';

@Component({
  selector: 'app-my-restaurant-landing',
  templateUrl: './my-restaurant-landing.component.html',
  styleUrls: ['./my-restaurant-landing.component.scss']
})
export class MyRestaurantLandingComponent implements OnInit {

  restaurants: Restaurant[] = [];
  userRestaurants: Restaurant[] = [];
  workPlaces: Restaurant[] = [];

  constructor(
    private myRestaurantService: MyRestaurantService,
    private restaurantService: RestaurantService,
    private dialog: MatDialog,
  ) { }

  async ngOnInit(): Promise<void> {
    this.userRestaurants = await this.myRestaurantService.getUserRestaurants();
    this.workPlaces = await this.myRestaurantService.getWorkPlaces();
    this.restaurants = await this.restaurantService.getRestaurants();
  }

  getEmployeesCount(restaurant: Restaurant) {
    return restaurant.workers?.length;
  }

  async getOrders(restaurant: Restaurant): Promise<Order[]> {
    const orders = await this.myRestaurantService.getRestaurantOrders(restaurant);
    return orders;
  }

  openNewReqDialog() {
    const dialogRef = this.dialog.open(RequestEditorComponent, {
      width: '600px',
      height: '500px',
      data: {
        myRestaurants: this.userRestaurants,
        restaurants: this.restaurants,
        workPlaces: this.workPlaces,
      },
      autoFocus: false,
    });

  }

  getAllRestaurants(): Restaurant[] {
    return this.restaurants;
  }
}
