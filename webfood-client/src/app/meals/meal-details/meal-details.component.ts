import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Meal } from 'src/app/core/meal';
import { MealService } from '../service/meal.service';

@Component({
  selector: 'app-meal-details',
  templateUrl: './meal-details.component.html',
  styleUrls: ['./meal-details.component.scss']
})
export class MealDetailsComponent implements OnInit {

  amountForm: FormGroup = this.fb.group({
    amount: ['1', []
    ]
  })

  amount: number = 1;

  @Input() meal!: Meal;

  constructor(
    private fb: FormBuilder,
    private mealService: MealService,
  ) { }

  ngOnInit(): void {

  }

  addToCartFromDetails(meal: Meal) {
    this.mealService.addMealToCart(meal, this.amount);
  }

  get getAmount(): FormControl {
    return this.amountForm.get('zipCode') as FormControl;
  }

  lowerAmount() {
    if (this.amount - 1 != 0) {
      --this.amount;
    } 
  }

  increaseAmount() {
    if (this.amount + 1 <= 20) {
      ++this.amount;
    } 
  }
}
