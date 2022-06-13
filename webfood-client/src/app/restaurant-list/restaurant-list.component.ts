import { Component, OnDestroy, OnInit } from '@angular/core';
import { Restaurant } from '../core/restaurant';

@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.scss']
})
export class RestaurantListComponent implements OnInit, OnDestroy {

  restaurants: Restaurant[] = [
    {
      name: 'McDonald\'s Egressy',
      description: 'Opening hours: xx:xx - yy:yy',
      done: true
    }, {
      name: 'Burger King Mexikoi',
      description: 'Opening hours: xx:xx - yy:yy',
      done: false
    }]

  constructor() { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }
}
