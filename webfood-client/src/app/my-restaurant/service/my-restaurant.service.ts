import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Meal } from 'src/app/core/meal';
import { Order } from 'src/app/core/order';
import { Restaurant } from 'src/app/core/restaurant';

@Injectable({
  providedIn: 'root'
})
export class MyRestaurantService {

  constructor(
    private httpClient: HttpClient,
  ) { }

  async getUserRestaurants(): Promise<Restaurant[]> {
    return (
      this.httpClient.get('/api/my-restaurant') as Observable<Restaurant[]>
    ).toPromise();
  }

  async getWorkPlaces(): Promise<Restaurant[]> {
    return (
      this.httpClient.get('/api/my-restaurant/workplaces') as Observable<Restaurant[]>
    ).toPromise();
  }

  async getRestaurantOrders(restaurant: Restaurant): Promise<Order[]> {
    return (
      this.httpClient.get(`/api/restaurants/${restaurant.id}/orders`) as Observable<Order[]>
    ).toPromise();
  }

  async getRestaurantMeals(restaurant: Restaurant): Promise<Meal[]> {
    return (
      this.httpClient.get(`/api/restaurants/${restaurant.id}/meals`) as Observable<Meal[]>
    ).toPromise();
  }
}
