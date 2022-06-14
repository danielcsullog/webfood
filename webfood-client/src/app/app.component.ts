import { Component, OnDestroy, OnInit } from '@angular/core';
import { MealService } from './meals/service/meal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    private mealService: MealService
  ) {

  }

  appTitle = 'webFood';
  badgeCount = this.mealService.getCartSize();

}
