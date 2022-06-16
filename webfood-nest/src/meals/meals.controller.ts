import { UniqueConstraintViolationException } from '@mikro-orm/core';
import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpException, HttpStatus, ParseIntPipe } from '@nestjs/common';
import { UserParam } from '../auth/user-param.decorator';
import { UserDto } from '../users/dto/user.dto';
import { MealDto } from './dto/meal.dto';
import { MealsService } from './meals.service';

@Controller('meals')
export class MealsController {
  constructor(private readonly mealsService: MealsService) { }

  @Post()
  async create(
    @Body() createMealDto: MealDto,
    @UserParam() userDto: UserDto
  ): Promise<MealDto> {
    try {
      const newMeal = await this.mealsService.create(createMealDto, userDto);

      if (!newMeal) {
        throw new HttpException('Only restaurant Owner or Admin can add new meals!', HttpStatus.FORBIDDEN);
      }

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
  async findAll(@Query() mealDto: MealDto): Promise<MealDto[]> {
    const meals = await this.mealsService.findAll(mealDto);
    return meals.map(meal => new MealDto(meal));
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number
  ): Promise<MealDto> {
    const meal = await this.mealsService.findOne(id);

    if (!meal) {
      throw new HttpException('Meal not found!', HttpStatus.NOT_FOUND);
    }

    return new MealDto(meal);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMealDto: MealDto,
    @UserParam() userDto: UserDto
  ): Promise<MealDto> {
    const newMeal = await this.mealsService
      .update(id, updateMealDto, userDto);

    if (!newMeal) {
      throw new HttpException(
        'Update failed. Meal not found!',
        HttpStatus.NOT_FOUND
      );
    }

    return new MealDto(newMeal);
  }

  @Delete(':id')
  async remove(
    @Param('id', ParseIntPipe) id: number,
    @UserParam() userDto: UserDto
  ): Promise<MealDto> {
    const deletedMeal = await this.mealsService.remove(id, userDto);
    if (!deletedMeal) {
      throw new HttpException('Meal not found!', HttpStatus.NOT_FOUND);
    }

    return new MealDto(deletedMeal);
  }
}
