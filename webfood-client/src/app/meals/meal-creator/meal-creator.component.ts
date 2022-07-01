import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Meal } from 'src/app/core/meal';
import { Restaurant } from 'src/app/core/restaurant';
import { MealService } from '../service/meal.service';

@Component({
  selector: 'app-meal-creator',
  templateUrl: './meal-creator.component.html',
  styleUrls: ['./meal-creator.component.scss']
})
export class MealCreatorComponent implements OnInit {

  mealForm: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    price: ['', [Validators.required]],
    description: ['', [Validators.required]],
    category: ['', [Validators.required]],
    isVegan: false,
    isSpicy: false,
    isVegetarian: false,
    isLactoseFree: false,
    isGlutenFree: false,
    isSugarFree: false,
  })

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {
      meal: Meal;
      restaurant: Restaurant;
    },
    private fb: FormBuilder,
    private mealService: MealService,
    private dialogRef: MatDialogRef<MealCreatorComponent>,
  ) { }

  ngOnInit(): void {
    if(this.data.meal) {
      this.name.setValue(this.data.meal.name);
      this.price.setValue(this.data.meal.price);
      this.description.setValue(this.data.meal.description);
      this.category.setValue(this.data.meal.category);
      this.isVegan.setValue(this.data.meal.isVegan);
      this.isSpicy.setValue(this.data.meal.isSpicy);
      this.isVegetarian.setValue(this.data.meal.isVegetarian);
      this.isLactoseFree.setValue(this.data.meal.isLactoseFree);
      this.isGlutenFree.setValue(this.data.meal.isGlutenFree);
      this.isSugarFree.setValue(this.data.meal.isSugarFree);
    }
  }

  async submit() {
    if (!this.mealForm.valid) {
      return;
    }

    const newMeal = this.mealForm.value as Meal;
    newMeal.restaurantId = this.data.restaurant.id;

    if(!this.data.meal) {
      const createdMeal = await this.mealService.createMeal(newMeal);
      return createdMeal;
    }
    const updatedMeal = await this.mealService.updateMeal(this.data.meal.id!, newMeal);

    this.dialogRef.close();
    return updatedMeal;
  }

  get name(): FormControl {
    return this.mealForm.get('name') as FormControl;
  }
  get price(): FormControl {
    return this.mealForm.get('price') as FormControl;
  }
  get description(): FormControl {
    return this.mealForm.get('description') as FormControl;
  }
  get category(): FormControl {
    return this.mealForm.get('category') as FormControl;
  }
  get isVegan(): FormControl {
    return this.mealForm.get('isVegan') as FormControl;
  }
  get isSpicy(): FormControl {
    return this.mealForm.get('isSpicy') as FormControl;
  }
  get isVegetarian(): FormControl {
    return this.mealForm.get('isVegetarian') as FormControl;
  }
  get isLactoseFree(): FormControl {
    return this.mealForm.get('isLactoseFree') as FormControl;
  }
  get isGlutenFree(): FormControl {
    return this.mealForm.get('isGlutenFree') as FormControl;
  }
  get isSugarFree(): FormControl {
    return this.mealForm.get('isSugarFree') as FormControl;
  }
}
