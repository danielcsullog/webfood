import { Injectable } from '@angular/core';
import { Meal } from '../../core/meal';

@Injectable({
  providedIn: 'root'
})
export class MealService {

  meals: Meal[] = [
    {
      id: 1,
      name: "Big Mac",
      price: 1080,
      description: 'Dupla húsos marhaburger',
      category: "Burgers",
      isVegan: false,
      isSpicy: false,
      isVegetarian: false,
      isLactoseFree: false,
      isGlutenFree: false,
      isSugarFree: false
    }, {
      id: 2,
      name: "Big King",
      price: 1000,
      description: 'Dupla húsos marhaburger',
      category: "Burgers",
      isVegan: false,
      isSpicy: false,
      isVegetarian: false,
      isLactoseFree: false,
      isGlutenFree: false,
      isSugarFree: false
    }, {
      id: 3,
      name: "Lipton",
      price: 500,
      description: 'Tea',
      category: "Drinks",
      isVegan: true,
      isSpicy: false,
      isVegetarian: true,
      isLactoseFree: true,
      isGlutenFree: true,
      isSugarFree: false
    }, {
      id: 4,
      name: "Cola",
      price: 500,
      description: 'COCA',
      category: "Drinks",
      isVegan: false,
      isSpicy: false,
      isVegetarian: false,
      isLactoseFree: false,
      isGlutenFree: false,
      isSugarFree: false
    }, {
      id: 4,
      name: "Fanta",
      price: 500,
      description: 'Fanta',
      category: "Drinks",
      isVegan: false,
      isSpicy: false,
      isVegetarian: false,
      isLactoseFree: false,
      isGlutenFree: false,
      isSugarFree: false
    }];

  mealCategoriesNotUnique: string[] = [];

  cart: Meal[] = [];

  constructor() { }

  addMealToCart(meal: Meal, amount: number) {
    this.cart.push(meal);
  }

  removeMealFromCart(meal: Meal) {
    const index = this.cart.indexOf(meal, 0);
    if (index > -1) {
      this.cart.splice(index, 1);
    }
  }

  removeAllFromCart() {
    this.cart = [];
  }

  getCartSize(): number {
    return this.cart.length;
  }

  async getMeals(): Promise<Meal[]> {
    return this.meals;
  }

  async getMeal(id: number): Promise<Meal | undefined> {
    return this.meals.find(meal => meal.id === id);
  }

  async getDistinctCategories(): Promise<string[]> {
    for (let i = 0; i < this.meals.length; i++) {
      this.mealCategoriesNotUnique[i] = this.meals[i].category;
    }
   
    return [... new Set(this.mealCategoriesNotUnique)];
  }

}
