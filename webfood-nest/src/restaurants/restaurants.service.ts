import { FilterQuery } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/sqlite';
import { Injectable } from '@nestjs/common';
import { Order, OrderStatus } from '../orders/entities/order';
import { OrderDto } from '../orders/dto/order.dto';
import { UserDto } from '../users/dto/user.dto';
import { User, UserRole } from '../users/entities/user';
import { RestaurantDto } from './dto/restaurant.dto';
import { Restaurant } from './entities/restaurant';
import { MealsService } from '../meals/meals.service';
import { Meal } from '../meals/entities/meal';

@Injectable()
export class RestaurantsService {

  constructor(
    @InjectRepository(Restaurant)
    private restaurantRepository: EntityRepository<Restaurant>,

    @InjectRepository(User)
    private userRepository: EntityRepository<User>,

    @InjectRepository(Order)
    private orderRepository: EntityRepository<Order>,

    private mealService: MealsService
  ) { }

  async create(createRestaurantDto: RestaurantDto, user: UserDto) {
    const restaurant = new Restaurant();
    restaurant.name = createRestaurantDto.name;
    restaurant.description = createRestaurantDto.description;
    restaurant.priceCategory = 0;
    restaurant.category = createRestaurantDto.category;
    restaurant.address = createRestaurantDto.address;
    restaurant.openingHours = createRestaurantDto.openingHours;
    restaurant.phoneNumber = createRestaurantDto.phoneNumber;

    restaurant.owner = this.userRepository.getReference(user.id);

    if (restaurant.workers) {
      restaurant.workers.set(
        createRestaurantDto.workers.map((worker) =>
          this.userRepository.getReference(worker.id)
        )
      )
    }

    await this.restaurantRepository.persistAndFlush(restaurant);
    await this.restaurantRepository.populate(restaurant, ['owner', 'workers']);

    return restaurant;
  }

  async findAll(restaurantDto: RestaurantDto): Promise<Restaurant[]> {
    const filters: FilterQuery<Restaurant> = {
      name: { $like: `%${restaurantDto.name || ''}%` },
    };

    return await this.restaurantRepository.find(filters, {
      populate: ['owner', 'workers', 'orders']
    });
  }

  async findOne(restaurantId: number): Promise<Restaurant> {
    return await this.restaurantRepository.findOne(
      { id: restaurantId },
      { populate: ['owner', 'workers', 'orders'] }
    );
  }

  async update(
    restaurantId: number,
    restaurantDto: RestaurantDto,
    user: UserDto
  ): Promise<Restaurant> {

    const filters: FilterQuery<Restaurant> = { id: restaurantId };

    if (user.role === UserRole.User) {
      filters.owner = { id: user.id };
    }

    const restaurant = await this.restaurantRepository
      .findOne(filters)

    if (!restaurant) {
      return;
    }

    restaurant.name = restaurantDto.name || restaurant.name;
    restaurant.description = restaurantDto.description || restaurant.description;
    restaurant.category = restaurantDto.category || restaurant.category;
    restaurant.address = restaurantDto.address || restaurant.address;
    restaurant.openingHours = restaurantDto.openingHours || restaurant.openingHours;
    restaurant.phoneNumber = restaurantDto.phoneNumber || restaurant.phoneNumber;

    if (restaurantDto.workers) {
      restaurant.workers.set(
        restaurantDto.workers.map((worker) =>
          this.userRepository.getReference(worker.id)
        )
      )
    }

    await this.restaurantRepository.persistAndFlush(restaurant);
    await this.restaurantRepository.populate(restaurant, ['owner', 'workers']);

    return restaurant;
  }

  async remove(id: number): Promise<Restaurant> {
    const restaurant = await this.restaurantRepository.findOne({ id });
    if (!restaurant) {
      return;
    }

    await this.restaurantRepository.removeAndFlush(restaurant);

    return restaurant;
  }

  async updateRestaurantOrder(
    restaurantId: number,
    orderId: number,
    updateOrderDto: OrderDto,
    user: UserDto
  ): Promise<Order> {

    const restaurant = await this.restaurantRepository.findOne(restaurantId, {
      populate: ['workers']
    });

    if (!restaurant) {
      return;
    }

    if (user.role === UserRole.User) {
      let userHasAccess = false;

      if (restaurant.owner.id != user.id) {

        for (const worker of restaurant.workers) {
          if (worker.id == user.id) {
            userHasAccess = true;
            break;
          }
        }

        if (userHasAccess == false) {
          return;
        }
      }
    }

    const order = await this.orderRepository.findOne({ orderId }, {
      populate: ['user', 'userAddress', 'orderItems', 'restaurant']
    });

    if (!order) {
      return;
    }

    order.orderStatus = updateOrderDto.orderStatus || order.orderStatus;
    if (order.orderStatus === OrderStatus.Done) {
      order.orderDoneDate = new Date();
    }

    await this.orderRepository.persistAndFlush(order);

    return order;
  }

  async getRestaurantsOrders(
    restaurantId: number,
    user: UserDto
  ): Promise<Order[]> {

    const restaurantFromId = await this.restaurantRepository.findOne(restaurantId, {
      populate: ['workers', 'orders']
    });

    if (!restaurantFromId) {
      return;
    }

    if (user.role == UserRole.User) {
      let userHasAccess = false;

      if (restaurantFromId.owner.id != user.id) {

        for (const worker of restaurantFromId.workers) {
          if (worker.id == user.id) {
            userHasAccess = true;
            break;
          }
        }

        if (userHasAccess == false) {
          return;
        }
      }
    }

    return restaurantFromId.orders.getItems();
  }

  async getMeals(restaurantId: number): Promise<Meal[]> {
    const meals = await this.mealService
      .findAllRestaurantMeals(restaurantId);
    return meals;
  }

  async getUserRestaurants(user: UserDto): Promise<Restaurant[]> {
    const filters: FilterQuery<Restaurant> = {
      owner: { id: user.id }
    };

    return await this.restaurantRepository.find(filters, {
      populate: ['owner'],
    })
  }

}
