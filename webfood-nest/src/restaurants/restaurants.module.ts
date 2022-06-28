import { Module } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { RestaurantsController } from './restaurants.controller';
import { Restaurant } from './entities/restaurant';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { User } from '../users/entity/user';
import { Order } from '../orders/entities/order';
import { Meal } from '../meals/entities/meal';
import { MealsService } from '../meals/meals.service';

@Module({
  imports: [MikroOrmModule.forFeature({ entities: [Restaurant, User, Order, Meal]})],
  controllers: [RestaurantsController],
  providers: [RestaurantsService, MealsService]
})
export class RestaurantsModule {}
