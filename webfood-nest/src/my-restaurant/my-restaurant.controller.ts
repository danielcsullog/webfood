import { Controller, Get } from '@nestjs/common';
import { UserDto } from '../users/dto/user.dto';
import { UserParam } from '../auth/user-param.decorator';
import { RestaurantDto } from '../restaurants/dto/restaurant.dto';
import { MyRestaurantService } from './my-restaurant.service';
import { User } from '../users/entity/user';

@Controller('my-restaurant')
export class MyRestaurantController {
    constructor(private readonly myRestaurantService: MyRestaurantService){

    }

    @Get('')
    async getUserRestaurants(
        @UserParam() userDto: UserDto,
    ): Promise<RestaurantDto[]> {
        const restaurants = await this.myRestaurantService
            .getUserRestaurants(userDto);

        return restaurants.map(restaurant => new RestaurantDto(restaurant));
    }

    @Get('workplaces')
    async getWorkPlaces(
        @UserParam() userDto: UserDto,
    ): Promise<RestaurantDto[]> {
        const restaurants = await this.myRestaurantService
            .getUserWorkPlaces(userDto);

        return restaurants.map(restaurant => new RestaurantDto(restaurant));
    }
}
