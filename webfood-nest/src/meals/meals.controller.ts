import { UniqueConstraintViolationException } from '@mikro-orm/core';
import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpException, HttpStatus } from '@nestjs/common';
import { UserParam } from 'src/auth/user-param.decorator';
import { UserDto } from 'src/users/dto/user.dto';
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
      
      if(!newMeal) {
        throw new HttpException('Only RestaurantAdmin or Admin can add new meals!', HttpStatus.FORBIDDEN);
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
  async findAll(@Query() mealDto: MealDto) {
    const meals = await this.mealsService.findAll(mealDto);
    return meals.map(meal => new MealDto(meal));
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<MealDto>{
    const meal = await this.mealsService.findOne(+id);

    if (!meal) {
      throw new HttpException('Meal not found!', HttpStatus.NOT_FOUND);
    }

    return new MealDto(meal);
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
