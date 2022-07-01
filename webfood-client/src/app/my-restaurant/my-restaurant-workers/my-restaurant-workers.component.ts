import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Restaurant } from 'src/app/core/restaurant';
import { User } from 'src/app/core/user';
import { RestaurantService } from 'src/app/restaurants/service/restaurant.service';

@Component({
  selector: 'app-my-restaurant-workers',
  templateUrl: './my-restaurant-workers.component.html',
  styleUrls: ['./my-restaurant-workers.component.scss']
})
export class MyRestaurantWorkersComponent implements OnInit {

  workers: User[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {
      restaurant: Restaurant;
    },
    private restaurantService: RestaurantService,
  ) { }

  ngOnInit(): void {
    this.workers = this.data.restaurant.workers!;
  }

}
