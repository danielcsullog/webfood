import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Order } from 'src/app/core/order';
import { Restaurant } from 'src/app/core/restaurant';
import { RequestEditorComponent } from 'src/app/requests/request-editor/request-editor.component';
import { RequestService } from 'src/app/requests/service/request.service';
import { RestaurantService } from 'src/app/restaurants/service/restaurant.service';
import { UserService } from 'src/app/user/user.service';
import { MyRestaurantService } from '../service/my-restaurant.service';
import { Request } from '../../core/request'
import { MyRestaurantOrdersComponent } from '../my-restaurant-orders/my-restaurant-orders.component';
import { MyRestaurantWorkersComponent } from '../my-restaurant-workers/my-restaurant-workers.component';
import { MealEditorComponent } from 'src/app/meals/meal-editor/meal-editor.component';

@Component({
  selector: 'app-my-restaurant-landing',
  templateUrl: './my-restaurant-landing.component.html',
  styleUrls: ['./my-restaurant-landing.component.scss']
})
export class MyRestaurantLandingComponent implements OnInit {

  restaurants: Restaurant[] = [];
  userRestaurants: Restaurant[] = [];
  userRequests: Request[] = [];
  workPlaces: Restaurant[] = [];
  requests: Request[] = [];

  constructor(
    private myRestaurantService: MyRestaurantService,
    private restaurantService: RestaurantService,
    private dialog: MatDialog,
    private userService: UserService,
    private requestService: RequestService,
  ) { }

  async ngOnInit(): Promise<void> {
    this.userRestaurants = await this.myRestaurantService.getUserRestaurants();
    console.log(this.userRestaurants);
    this.workPlaces = await this.myRestaurantService.getWorkPlaces();
    this.restaurants = await this.restaurantService.getRestaurants();
    this.requests = await this.requestService.getAllRequests();
    this.userRequests = await this.requestService.getOnlyUserRequests();
    this.requests.reverse();
    this.userRequests.reverse();
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

  openRestaurantOrders(_restaurant: Restaurant) {
    const dialogRef = this.dialog.open(MyRestaurantOrdersComponent, {
      width: '600px',
      height: '800px',
      data: {
        restaurant: _restaurant,
      },
      autoFocus: false,
    })
  }

  openWorkers(_restaurant: Restaurant) {
    const dialogRef = this.dialog.open(MyRestaurantWorkersComponent, {
      width: '500px',
      height: '200px',
      data: {
        restaurant: _restaurant,
      },
      autoFocus: false,
    })
  }

  openMealEditor(_restaurant: Restaurant) {
    const dialogRef = this.dialog.open(MealEditorComponent, {
      width: '800px',
      height: '600px',
      data: {
        restaurant: _restaurant,
      },
      autoFocus: false,
    })
  }

  getAllRestaurants(): Restaurant[] {
    return this.restaurants;
  }

  get isAdmin() {
    return this.userService.isAdmin;
  }

}
