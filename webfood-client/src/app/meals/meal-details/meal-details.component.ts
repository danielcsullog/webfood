import { Component, Input, OnInit } from '@angular/core';
import { Meal } from 'src/app/core/meal';
import { MealService } from '../service/meal.service';

@Component({
  selector: 'app-meal-details',
  templateUrl: './meal-details.component.html',
  styleUrls: ['./meal-details.component.scss']
})
export class MealDetailsComponent implements OnInit {

  @Input() meal!: Meal;

  constructor(
    private mealService: MealService,
  ) { }

  ngOnInit(): void {
    
  }

}
