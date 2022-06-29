import { UniqueConstraintViolationException } from '@mikro-orm/core';
import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpException, HttpStatus, ParseIntPipe } from '@nestjs/common';
import { UserDto } from '../users/dto/user.dto';
import { UserParam } from '../auth/user-param.decorator';
import { RestaurantDto } from './dto/restaurant.dto';
import { RestaurantsService } from './restaurants.service';
import { Roles } from '../auth/roles';
import { User, UserRole } from '../users/entities/user';
import { OrderDto } from '../orders/dto/order.dto';
import { MealDto } from '../meals/dto/meal.dto';

@Controller('restaurants')
export class RestaurantsController {
  constructor(private readonly restaurantsService: RestaurantsService) { }

  @Post()
  async create(
    @Body() createRestaurantDto: RestaurantDto,
    @UserParam() userDto: UserDto
  ): Promise<RestaurantDto> {
    try {
      const newRestaurant = await this.restaurantsService.create(createRestaurantDto, userDto);
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
  async findAll(@Query() restaurantDto: RestaurantDto): Promise<RestaurantDto[]> {
    const restaurants = await this.restaurantsService.findAll(restaurantDto);
    return restaurants.map((restaurant) => new RestaurantDto(restaurant));
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number
  ): Promise<RestaurantDto> {
    const restaurant = await this.restaurantsService.findOne(id);

    if (!restaurant) {
      throw new HttpException('Restaurant not found!', HttpStatus.NOT_FOUND);
    }

    return new RestaurantDto(restaurant);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRestaurantDto: RestaurantDto,
    @UserParam() userDto: UserDto
  ): Promise<RestaurantDto> {
    const updatedRestaurant = await this.restaurantsService
      .update(id, updateRestaurantDto, userDto);

    if (!updatedRestaurant) {
      throw new HttpException(
        'Update failed. Restaurant not found!',
        HttpStatus.NOT_FOUND
      );
    }

    return new RestaurantDto(updatedRestaurant);
  }

  @Delete(':id')
  @Roles(UserRole.Admin)
  async remove(
    @Param('id', ParseIntPipe) id: number
  ): Promise<RestaurantDto> {
    const deletedRestaurant = await this.restaurantsService.remove(id);
    if (!deletedRestaurant) {
      throw new HttpException('Restaurant not found!', HttpStatus.NOT_FOUND);
    }

    return new RestaurantDto(deletedRestaurant);
  }

  @Get(':restaurantId/orders')
  async getRestaurantsOrders (
    @Param('restaurantId', ParseIntPipe) restaurantId: number,
    @UserParam() userDto: UserDto
  ): Promise<OrderDto[]> {
    const orders = await this.restaurantsService
      .getRestaurantsOrders(restaurantId, userDto);

    if (!orders) {
      throw new HttpException('No access rights!', HttpStatus.FORBIDDEN);
    }

    return orders.map(order => new OrderDto(order));
  }

  @Patch(':restaurantId/orders/:orderId')
  async updateRestaurantOrder(
    @Param('restaurantId', ParseIntPipe) restaurantId: number,
    @Param('orderId', ParseIntPipe) orderId: number,
    @Body() updateOrderDto: OrderDto,
    @UserParam() userDto: User
  ): Promise<OrderDto> {
    const updatedOrder = await this.restaurantsService
      .updateRestaurantOrder(restaurantId, orderId, updateOrderDto, userDto);

    if(!updatedOrder) {
      throw new HttpException(
        'Update failed. Order not found!',
        HttpStatus.NOT_FOUND
      );
    }

    return new OrderDto(updatedOrder);
  }

  @Get(':restaurantId/meals')
  async getRestaurantMeals(
    @Param('restaurantId', ParseIntPipe) restaurantId: number,
  ): Promise<MealDto[]> {
    const meals = await this.restaurantsService.getMeals(restaurantId);

    return meals.map(meal => new MealDto(meal));
  }
}
