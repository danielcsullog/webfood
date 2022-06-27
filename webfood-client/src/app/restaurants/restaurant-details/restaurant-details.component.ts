import { Component, Input, OnInit } from '@angular/core';
import { CartService } from 'src/app/cart/service/cart.service';
import { Restaurant } from '../../core/restaurant';

@Component({
  selector: 'app-restaurant-details',
  templateUrl: './restaurant-details.component.html',
  styleUrls: ['./restaurant-details.component.scss']
})
export class RestaurantDetailsComponent implements OnInit {

  @Input() restaurant!: Restaurant;

  constructor() { }

  ngOnInit(): void {
  }

  openOffers(restaurant: Restaurant) {
    console.log(restaurant);
  }

}
