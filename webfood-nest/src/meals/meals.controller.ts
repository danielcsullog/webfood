import { UniqueConstraintViolationException } from '@mikro-orm/core';
import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpException, HttpStatus } from '@nestjs/common';
import { MealDto } from './dto/meal.dto';
import { MealsService } from './meals.service';

@Controller('meals')
export class MealsController {
  constructor(private readonly mealsService: MealsService) { }

  @Post()
  async create(@Body() createMealDto: MealDto) {
    try {
      const newMeal = await this.mealsService.create(createMealDto);
      return new MealDto(newMeal);
    } catch (e) {
      if (e instanceof UniqueConstraintViolationException) {
        throw new HttpException('Meal already exists', HttpStatus.CONFLICT);
      } else {
        throw e;
      }
    }
  }

  @Get()
  async findAll(@Query() mealDto: MealDto) {
    const meals = await this.mealsService.findAll(mealDto);
    return meals.map(meal => new MealDto(meal));
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mealsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMealDto: MealDto) {
    return this.mealsService.update(+id, updateMealDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mealsService.remove(+id);
  }
}
