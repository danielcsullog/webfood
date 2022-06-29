import { Module } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { RestaurantsController } from './restaurants.controller';
import { Restaurant } from './entities/restaurant';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { User } from '../users/entities/user';
import { Order } from '../orders/entities/order';
import { Meal } from '../meals/entities/meal';
import { MealsService } from '../meals/meals.service';
import { Request } from '../requests/entities/request';

@Module({
  imports: [MikroOrmModule.forFeature({ entities: [Restaurant, User, Order, Meal, Request]})],
  controllers: [RestaurantsController],
  providers: [RestaurantsService, MealsService]
})
export class RestaurantsModule {}
