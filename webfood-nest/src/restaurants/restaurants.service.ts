import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/sqlite';
import { Injectable } from '@nestjs/common';
import { RestaurantDto } from './dto/restaurant.dto';
import { Restaurant } from './entities/restaurant';

@Injectable()
export class RestaurantsService {

  constructor (
    @InjectRepository(Restaurant)
    private restaurantRepository: EntityRepository<Restaurant>
  ) {}

  async create(createRestaurantDto: RestaurantDto) {
    const restaurant = new Restaurant();
    restaurant.name = createRestaurantDto.name;
    restaurant.description = createRestaurantDto.description;
    restaurant.priceCategory = createRestaurantDto.priceCategory;
    restaurant.category = createRestaurantDto.category;
    restaurant.address = createRestaurantDto.address;
    restaurant.openingHours = createRestaurantDto.openingHours;
    restaurant.phoneNumber = createRestaurantDto.phoneNumber;

    await this.restaurantRepository.persistAndFlush(restaurant);

    return restaurant;
  }

  async findAll(restaurantDto: RestaurantDto) {
    return await this.restaurantRepository.find({
      name: { $like: `%${restaurantDto.name || ''}%`},
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} restaurant`;
  }

  update(id: number, updateRestaurantDto: RestaurantDto) {
    return `This action updates a #${id} restaurant`;
  }

  remove(id: number) {
    return `This action removes a #${id} restaurant`;
  }
}
