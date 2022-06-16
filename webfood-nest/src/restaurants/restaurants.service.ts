import { FilterQuery } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/sqlite';
import { Injectable } from '@nestjs/common';
import { UserDto } from 'src/users/dto/user.dto';
import { User, UserRole } from '../users/entity/user';
import { RestaurantDto } from './dto/restaurant.dto';
import { Restaurant } from './entities/restaurant';

@Injectable()
export class RestaurantsService {

  constructor(
    @InjectRepository(Restaurant)
    private restaurantRepository: EntityRepository<Restaurant>,

    @InjectRepository(User)
    private userRepository: EntityRepository<User>
  ) { }

  async create(createRestaurantDto: RestaurantDto, user: UserDto) {
    const restaurant = new Restaurant();
    restaurant.name = createRestaurantDto.name;
    restaurant.description = createRestaurantDto.description;
    restaurant.priceCategory = createRestaurantDto.priceCategory;
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
      populate: ['owner', 'workers']
    });
  }

  async findOne(restaurantId: number): Promise<Restaurant> {
    return await this.restaurantRepository.findOne(
      { id: restaurantId },
      { populate: ['owner', 'workers'] }
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

    const restaurant = await this.restaurantRepository.findOne(filters)

    if(!restaurant) {
      return;
    }

    restaurant.name = restaurantDto.name || restaurant.name;
    restaurant.description = restaurantDto.description || restaurant.description;
    restaurant.priceCategory = restaurantDto.priceCategory || restaurant.priceCategory;
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
    await this.restaurantRepository.removeAndFlush(restaurant);

    return restaurant;
  }
}
