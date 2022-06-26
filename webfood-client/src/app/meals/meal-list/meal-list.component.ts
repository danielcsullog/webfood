import { Component, Input, OnInit } from '@angular/core';
import { Restaurant } from 'src/app/core/restaurant';
import { Meal } from '../../core/meal';
import { MealService } from '../service/meal.service';

@Component({
  selector: 'app-meal-list',
  templateUrl: './meal-list.component.html',
  styleUrls: ['./meal-list.component.scss']
})
export class MealListComponent implements OnInit {

  meals: Meal[] = [];
  filteredMeals: Meal[] = [];
  mealCategories?: string[];
  searchString: string = "";

  @Input() restaurant!: Restaurant;

  constructor(
    private mealService: MealService,
  ) { }

  async ngOnInit(): Promise<void> {
    this.meals = await this.mealService.getMeals(this.restaurant.id);
    this.mealCategories = await this.mealService.getDistinctCategories(this.restaurant.id);
    this.filteredMeals = this.meals;
  }

  async search(): Promise<Meal[]> {
    this.filteredMeals = [];
    let lowerCaseName: string;
    for (let i = 0; i < this.meals.length; i++) {
      lowerCaseName = this.meals[i].name.toLowerCase();
      if (lowerCaseName.includes(this.searchString.toLowerCase())) {
        this.filteredMeals.push(this.meals[i]);
      }
    }
    return this.filteredMeals;
  }
}
