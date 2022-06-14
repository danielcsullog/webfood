import { Component, OnInit } from '@angular/core';
import { Meal } from '../../core/meal';
import { MealService } from '../service/meal.service';

@Component({
  selector: 'app-meal-list',
  templateUrl: './meal-list.component.html',
  styleUrls: ['./meal-list.component.scss']
})
export class MealListComponent implements OnInit {

  meals?: Meal[];
  mealCategories?: string[];

  constructor(
    private mealService: MealService,
  ) { }

  async ngOnInit(): Promise<void> {
    this.meals = await this.mealService.getMeals();
    this.mealCategories = await this.mealService.getDistinctCategories();
    console.log("Mealcategories: " + this.mealCategories);
  }

}
