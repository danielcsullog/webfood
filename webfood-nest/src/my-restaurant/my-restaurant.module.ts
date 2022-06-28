import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { Restaurant } from '../restaurants/entities/restaurant';
import { MyRestaurantController } from './my-restaurant.controller';
import { MyRestaurantService } from './my-restaurant.service';

@Module({
  imports: [MikroOrmModule.forFeature({ entities: [Restaurant]})],
  controllers: [MyRestaurantController],
  providers: [MyRestaurantService]
})
export class MyRestaurantModule {}
