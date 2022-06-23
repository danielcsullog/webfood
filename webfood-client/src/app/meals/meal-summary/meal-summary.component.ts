import { Component, Input, OnInit } from '@angular/core';
import { Meal } from 'src/app/core/meal';
import { MealService } from '../service/meal.service';

@Component({
  selector: 'app-meal-summary',
  templateUrl: './meal-summary.component.html',
  styleUrls: ['./meal-summary.component.scss']
})
export class MealSummaryComponent implements OnInit {

  @Input() meal!: Meal;

  constructor(
    private mealService: MealService
  ) { }

  ngOnInit(): void {
  }

}
