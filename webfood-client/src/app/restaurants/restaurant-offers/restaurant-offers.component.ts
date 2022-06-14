import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Restaurant } from '../../core/restaurant';
import { RestaurantService } from '../service/restaurant.service';

@Component({
  selector: 'app-restaurant-offers',
  templateUrl: './restaurant-offers.component.html',
  styleUrls: ['./restaurant-offers.component.scss']
})
export class RestaurantOffersComponent implements OnInit {

  restaurant?: Restaurant;

  constructor(
    private restaurantService: RestaurantService,
    private route: ActivatedRoute,
  ) { }

  async ngOnInit(): Promise<void> {
    const restaurantId = this.route.snapshot.paramMap.get('restaurantId');
    if (restaurantId) {
      this.restaurant = await this.restaurantService
        .getRestaurant(parseInt(restaurantId));
    }
  }

}
