import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Meal } from '../../core/meal';

@Injectable({
  providedIn: 'root'
})
export class MealService {

  mealCategoriesNotUnique: string[] = [];

  constructor(
    private httpClient: HttpClient
  ) { }

  async createMeal(newMeal: Meal) {
    return await (
      this.httpClient.post(
        '/api/meals',
        newMeal
      ) as Observable<Meal>
    ).toPromise();
  }

  async updateMeal(oldMealId: number, newMeal: Meal) {
    return await (
      this.httpClient.patch(
        `/api/meals/${oldMealId}`,
          newMeal
        ) as Observable<Meal>
      ).toPromise();
  }

  async getMeals(restaurantId: number): Promise<Meal[]> {
    return (
      this.httpClient.get(`/api/restaurants/${restaurantId}/meals`) as Observable<Meal[]>
    ).toPromise();
  }

  async getMeal(id: number): Promise<Meal | undefined> {
    return (
      this.httpClient.get(`/api/meals/${id}`) as Observable<Meal>
    ).toPromise();
  }

  async getDistinctCategories(restaurantId: number): Promise<string[]> {
    let meals = await this.getMeals(restaurantId);

    for (let i = 0; i < meals.length; i++) {
      this.mealCategoriesNotUnique[i] = meals[i].category;
    }

    return [... new Set(this.mealCategoriesNotUnique)];
  }


}
