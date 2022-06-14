import { Component, OnInit } from '@angular/core';
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

  constructor(
    private mealService: MealService,
  ) { }

  async ngOnInit(): Promise<void> {
    this.meals = await this.mealService.getMeals();
    this.mealCategories = await this.mealService.getDistinctCategories();
    this.filteredMeals =  this.meals;
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
