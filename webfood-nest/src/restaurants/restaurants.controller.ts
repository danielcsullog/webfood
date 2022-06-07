import { UniqueConstraintViolationException } from '@mikro-orm/core';
import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpException, HttpStatus } from '@nestjs/common';
import { RestaurantDto } from './dto/restaurant.dto';
import { RestaurantsService } from './restaurants.service';

@Controller('restaurants')
export class RestaurantsController {
  constructor(private readonly restaurantsService: RestaurantsService) { }

  @Post()
  async create(@Body() createRestaurantDto: RestaurantDto) {
    try {
      const newRestaurant = await this.restaurantsService.create(createRestaurantDto);
      return new RestaurantDto(newRestaurant);
    } catch (e) {
      if (e instanceof UniqueConstraintViolationException) {
        throw new HttpException('Restaurant already exists', HttpStatus.CONFLICT);
      } else {
        throw e;
      }
    }
  }

  @Get()
  findAll(@Query() restaurantDto: RestaurantDto) {
    return this.restaurantsService.findAll(restaurantDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.restaurantsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRestaurantDto: RestaurantDto) {
    return this.restaurantsService.update(+id, updateRestaurantDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.restaurantsService.remove(+id);
  }
}
