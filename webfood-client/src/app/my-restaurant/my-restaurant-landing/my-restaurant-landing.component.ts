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

  getAllRestaurants(): Restaurant[] {
    return this.restaurants;
  }

  get isAdmin() {
    return this.userService.isAdmin;
  }
}
