import { FilterQuery } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/sqlite';
import { Injectable } from '@nestjs/common';
import { UserDto } from '../users/dto/user.dto';
import { UserRole } from '../users/entity/user';
import { Restaurant } from '../restaurants/entities/restaurant';
import { MealDto } from './dto/meal.dto';
import { Meal } from './entities/meal';

@Injectable()
export class MealsService {

  constructor(
    @InjectRepository(Meal)
    private mealRepository: EntityRepository<Meal>,

    @InjectRepository(Restaurant)
    private restaurantRepository: EntityRepository<Restaurant>
  ) { }

  async create(createMealDto: MealDto, user: UserDto): Promise<Meal> {
    const meal = new Meal();

    let restaurant: Restaurant;

    if (createMealDto.restaurantIds) {
      for (let restaurantId of createMealDto.restaurantIds) {
        const filters: FilterQuery<Restaurant> = { id: restaurantId };
        
        if (user.role === UserRole.User) {
          filters.owner = { id: user.id };
        }

        restaurant = await this.restaurantRepository.findOne(filters, {
          populate: ['meals']
        });

        if (!restaurant) {
          return;
        }

        let prices: number[] = [];
        for (let meal of restaurant.meals) {
          prices.push(meal.price);
        }

        restaurant.priceCategory = this.calculatePriceCategoryForRestaurant(
            prices, 
            createMealDto.price
        );
        
        meal.restaurants.add(restaurant);
      }
    }
  
    meal.name = createMealDto.name;
    meal.price = createMealDto.price;
    meal.description = createMealDto.description;
    meal.category = createMealDto.category;
    meal.isVegan = createMealDto.isVegan;
    meal.isSpicy = createMealDto.isSpicy;
    meal.isVegetarian = createMealDto.isVegetarian;
    meal.isLactoseFree = createMealDto.isLactoseFree;
    meal.isGlutenFree = createMealDto.isGlutenFree;
    meal.isSugarFree = createMealDto.isSugarFree;

    await this.mealRepository.persistAndFlush(meal);
    await this.restaurantRepository.persistAndFlush(restaurant);

    return meal;
  }

  private calculatePriceCategoryForRestaurant(
    prices: number[],
    newMealPrice: number
  ): number {
    let sumPrices = newMealPrice;
    for (let price of prices) {
      if (!price) {
        price = 0;
      }
      sumPrices += price;
    }  

    const averagePrice = sumPrices / (prices.length + 1);

    if (averagePrice < 1000) {
      return 1;
    } else if (averagePrice < 1500) {
      return 2;
    } else if (averagePrice < 2000) {
      return 3;
    } else if (averagePrice < 2500) {
      return 4;
    } else {
      return 5;
    }
  }

  async findAll(mealDto: MealDto): Promise<Meal[]> {
    return await this.mealRepository.find({
      name: { $like: `%${mealDto.name || ''}%` },
    });
  }

  async findOne(mealId: number) {
    return await this.mealRepository.findOne({ id: mealId });
  }

  async findAllRestaurantMeals(restaurantId: number): Promise<Meal[]> {
    const filters: FilterQuery<Meal> = { restaurants: {
      id: restaurantId
    } };
    const meals = await this.mealRepository.find(filters);
    return meals;
  }

  async update(
    mealId: number, 
    updateMealDto: MealDto, 
    user: UserDto
  ): Promise<Meal> {

    const meal = await this.mealRepository.findOne(mealId);
    await this.mealRepository.populate(meal, ['restaurants']);

    if (!meal) {
      return;
    }

    for(let item of meal.restaurants) {
      const filters: FilterQuery<Restaurant> = { id: item.id };
      if (user.role === UserRole.User) {
        filters.owner = { id: user.id };
      }

      const restaurant = await this.restaurantRepository.findOne(filters);
      if (!restaurant) {
        return;
      }
    }

    meal.name = updateMealDto.name || meal.name;
    meal.price = updateMealDto.price || meal.price;
    meal.description = updateMealDto.description || meal.description;
    meal.category = updateMealDto.category || meal.category;
    meal.isVegan = updateMealDto.isVegan || meal.isVegan;
    meal.isSpicy = updateMealDto.isSpicy || meal.isSpicy;
    meal.isVegetarian = updateMealDto.isVegetarian || meal.isVegetarian;
    meal.isLactoseFree = updateMealDto.isLactoseFree || meal.isLactoseFree;
    meal.isGlutenFree = updateMealDto.isGlutenFree || meal.isGlutenFree;
    meal.isSugarFree = updateMealDto.isSugarFree || meal.isSugarFree;

    await this.restaurantRepository.persistAndFlush(meal);

    return meal;
  }

  async remove(mealId: number, user: UserDto): Promise<Meal> {
    const meal = await this.mealRepository.findOne(mealId);
    if(!meal) {
      return;
    }

    for(let item of meal.restaurants) {
      const filters: FilterQuery<Restaurant> = { id: item.id };
        
      if (user.role === UserRole.User) {
        filters.owner = { id: user.id };
      }

      const restaurant = await this.restaurantRepository.findOne(filters);
      if (!restaurant) {
        return;
      }
    }

    await this.mealRepository.removeAndFlush(meal);

    return meal;
  }
}
