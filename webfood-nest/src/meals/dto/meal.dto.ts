import { RestaurantDto } from "../../restaurants/dto/restaurant.dto";
import { Meal } from "../entities/meal";

export class MealDto {
    id?: number;
    name?: string;
    price?: number;
    description?: string;
    category?: string;
    isVegan?: boolean;
    isSpicy?: boolean;
    isVegetarian?: boolean;
    isLactoseFree?: boolean;
    isGlutenFree?: boolean;
    isSugarFree?: boolean;
    restaurantIds?: number[];

    constructor(meal?: Meal) {
        if (meal) {
            this.id = meal.id;
            this.name = meal.name;
            this.price = meal.price;
            this.description = meal.description;
            this.category = meal.category;
            this.isVegan = meal.isVegan;
            this.isSpicy = meal.isSpicy;
            this.isVegetarian = meal.isVegetarian;
            this.isLactoseFree = meal.isLactoseFree;
            this.isGlutenFree = meal.isGlutenFree;
            this.isSugarFree = meal.isSugarFree;
            
            if(meal.restaurants?.isInitialized(true)) {
                this.restaurantIds = meal.restaurants
                    .getItems()
                    .map((restaurant) => restaurant.id /*new RestaurantDto(restaurant)*/);   
            } 
        }
    }
}