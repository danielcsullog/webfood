import { Component, OnDestroy, OnInit } from '@angular/core';
import { Restaurant } from '../../core/restaurant';
import { RestaurantService } from '../service/restaurant.service';

@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.scss']
})
export class RestaurantListComponent implements OnInit, OnDestroy {

  restaurants: Restaurant[] = [];
  filteredRestaurants: Restaurant[] = [];
  searchString: string = "";

  constructor(
    private restaurantService: RestaurantService,
  ) { }

  async ngOnInit(): Promise<void> {
    this.restaurants = await this.restaurantService.getRestaurants();
    this.filteredRestaurants =  this.restaurants;
  }

  async search(): Promise<Restaurant[]> {
    this.filteredRestaurants = [];
    let lowerCaseName: string;
    for (let i = 0; i < this.restaurants.length; i++) {
      lowerCaseName = this.restaurants[i].name.toLowerCase();
      if (lowerCaseName.includes(this.searchString.toLowerCase())) {
        this.filteredRestaurants.push(this.restaurants[i]);
      }
    }
    return this.filteredRestaurants;
  }

  ngOnDestroy(): void {
  }

  needToAddDollarSign(restaurant: Restaurant): number[] {
    return Array(restaurant.priceCategory).fill(0);
  }

}
