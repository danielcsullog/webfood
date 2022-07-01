import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Meal } from 'src/app/core/meal';
import { Restaurant } from 'src/app/core/restaurant';
import { MyRestaurantService } from 'src/app/my-restaurant/service/my-restaurant.service';
import { RestaurantService } from 'src/app/restaurants/service/restaurant.service';
import { MealCreatorComponent } from '../meal-creator/meal-creator.component';
import { MealService } from '../service/meal.service';

@Component({
  selector: 'app-meal-editor',
  templateUrl: './meal-editor.component.html',
  styleUrls: ['./meal-editor.component.scss']
})
export class MealEditorComponent implements OnInit {

  meals: Meal[] = [];

  mealCategories!: string[];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {
      restaurant: Restaurant;
    },
    private mealService: MealService,
    private dialog: MatDialog,
  ) { }

  async ngOnInit(): Promise<void> {
    this.meals = await this.mealService.getMeals(this.data.restaurant.id);
    this.mealCategories = await this.mealService.getDistinctCategories(this.data.restaurant.id);
  }

  openMealCreatorDialog(_meal?: Meal) {
    const dialogRef = this.dialog.open(MealCreatorComponent, {
      width: '800px',
      height: '600px',
      data: {
        meal: _meal,
        restaurant: this.data.restaurant,
      },
      autoFocus: false,
    })
  }
}
