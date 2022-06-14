import { Component, OnDestroy, OnInit } from '@angular/core';
import { Restaurant } from '../../core/restaurant';
import { RestaurantService } from '../service/restaurant.service';

@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.scss']
})
export class RestaurantListComponent implements OnInit, OnDestroy {    

  restaurants?: Restaurant[];

  constructor(
    private restaurantService: RestaurantService,
  ) { }

  async ngOnInit(): Promise<void> {
    this.restaurants = await this.restaurantService.getRestaurants();
  }

  ngOnDestroy(): void {
  }

  
}
