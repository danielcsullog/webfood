import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Restaurant } from '../../core/restaurant';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  restaurants: Restaurant[] = [
    {
      id: 1,
      name: "McDonald\'s",
      description: 'Fast food franchise',
      priceCategory: 3,
      category: "FASTFOOD",
      address: "Budapest, Egressy út 999.",
      openingHours: [
        "MON 08:00-22:00",
        "TUE 08:00-22:00",
        "WED 08:00-22:00",
        "THU 08:00-22:00",
        "FRI 08:00-22:00",
        "SAT 10:00-22:00",
        "SUN 10:00-22:00"
      ],
      phoneNumber: "+36301111111",
    }, {
      id: 2,
      name: "Burger King",
      description: 'Fast food franchise',
      priceCategory: 3,
      category: "FASTFOOD",
      address: "Budapest, Mexikói út 999.",
      openingHours: [
        "MON 08:00-22:00",
        "TUE 08:00-22:00",
        "WED 08:00-22:00",
        "THU 08:00-22:00",
        "FRI 08:00-22:00",
        "SAT 10:00-22:00",
        "SUN 10:00-22:00"
      ],
      phoneNumber: "+36302222222",
    }];

  private _currentId: number = 100;

  constructor(
    private httpClient: HttpClient
  ) {

  }

  async getRestaurants(): Promise<Restaurant[]> {
    return (
      this.httpClient.get('restaurants/') as Observable<Restaurant[]>
    ).toPromise();
  }

  async getRestaurant(id: number): Promise<Restaurant | undefined> {
    return this.restaurants.find(restaurant => restaurant.id === id);
  }

  async createRestaurant(restaurant: Restaurant): Promise<Restaurant> {
    restaurant.id = this._currentId;
    this._currentId++;
    this.restaurants.push(restaurant);
    return restaurant;
  }

  async editRestaurant(
    restaurantId: number,
    restaurant: Restaurant
  ): Promise<Restaurant> {
    const restaurantIndex = this.restaurants
      .findIndex(restaurant => restaurant.id === restaurantId);
    const modifiedRestaurant = {
      ...this.restaurants[restaurantIndex],
      ...restaurant,
    }
    this.restaurants.splice(restaurantIndex, 1, modifiedRestaurant);
    return restaurant;
  }

}
