import { Component, Inject, Input, OnInit } from '@angular/core';
import { Restaurant } from 'src/app/core/restaurant';

@Component({
  selector: 'app-restaurant-editor',
  templateUrl: './restaurant-editor.component.html',
  styleUrls: ['./restaurant-editor.component.scss']
})
export class RestaurantEditorComponent implements OnInit {

  @Input() myRestaurants!: Restaurant[];

  selectedRestaurant!: Restaurant;

  constructor() { }

  ngOnInit(): void {
  }

}
