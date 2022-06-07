import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/sqlite';
import { Injectable } from '@nestjs/common';
import { MealDto } from './dto/meal.dto';
import { Meal } from './entities/meal';

@Injectable()
export class MealsService {

  constructor(
    @InjectRepository(Meal)
    private mealRepository: EntityRepository<Meal>
  ) {}

  async create(createMealDto: MealDto) {
    const meal = new Meal();
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

    return meal;
  }

  async findAll(mealDto: MealDto) {
    return await this.mealRepository.find({
      name: { $like: `%${mealDto.name || ''}%`},
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} meal`;
  }

  update(id: number, updateMealDto: MealDto) {
    return `This action updates a #${id} meal`;
  }

  remove(id: number) {
    return `This action removes a #${id} meal`;
  }
}
