import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../../core/order';
import { Restaurant } from '../../core/restaurant';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  constructor(
    private httpClient: HttpClient
  ) {

  }

  async getRestaurants(): Promise<Restaurant[]> {
    return (
      this.httpClient.get('/api/restaurants') as Observable<Restaurant[]>
    ).toPromise();
  }

  async getRestaurant(id?: number): Promise<Restaurant> {
    return (
      this.httpClient.get(`/api/restaurants/${id}`) as Observable<Restaurant>
    ).toPromise();
  }

  async createRestaurant(restaurant: Restaurant): Promise<Restaurant> {
    const createdRestaurant = await (
      this.httpClient.post(
        '/api/restaurants',
        restaurant
      ) as Observable<Restaurant>
    ).toPromise();
    return createdRestaurant;
  }

  async editRestaurant(
    restaurantId: number,
    restaurant: Restaurant
  ): Promise<Restaurant> {
    const modifiedRestaurant = await (
      this.httpClient.patch(
        `/api/restaurants/${restaurantId}`,
        restaurant
      ) as Observable<Restaurant>
    ).toPromise();

    return modifiedRestaurant;
  }

  async deleteRestaurant(
    restaurant: Restaurant
  ): Promise<Restaurant> {
    const deletedRestaurant = await (
      this.httpClient.delete(
        `api/restaurants/${restaurant.id}`
      ) as Observable<Restaurant>
    ).toPromise()

    return deletedRestaurant;
  }

  async updateRestaurant(
    restaurant: Restaurant
  ): Promise<Restaurant> {
    const updatedRestaurant = await (
      this.httpClient.patch(
        `api/restaurants/${restaurant.id}`,
        restaurant
      ) as Observable<Restaurant>
    ).toPromise();
    return updatedRestaurant;
  }
}
