import { EntityRepository, FilterQuery } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { User } from '../users/entity/user';
import { Restaurant } from '../restaurants/entities/restaurant';
import { UserDto } from '../users/dto/user.dto';

@Injectable()
export class MyRestaurantService {
    

    constructor(
        @InjectRepository(Restaurant)
        private restaurantRepository: EntityRepository<Restaurant>,
    ) { }

    async getUserRestaurants(user: UserDto): Promise<Restaurant[]> {
        const filters: FilterQuery<Restaurant> = {
            owner: { id: user.id },
        };

        return await this.restaurantRepository.find(filters, {
            populate: ['owner', 'workers'],
        })
    }

    async getUserWorkPlaces(user: UserDto): Promise<Restaurant[]> {
        const filters: FilterQuery<Restaurant> = {
            workers: { id: user.id },
        };

        return await this.restaurantRepository.find(filters, {
            populate: ['workers'],
        })
    }
}
