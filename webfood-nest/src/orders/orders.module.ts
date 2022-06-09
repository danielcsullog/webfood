import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Order } from './entities/order';
import { Restaurant } from 'src/restaurants/entities/restaurant';
import { Meal } from 'src/meals/entities/meal';
import { OrderItem } from './entities/order.item';

@Module({
  imports: [MikroOrmModule.forFeature({ entities: [Order, Meal, Restaurant, OrderItem]})],
  providers: [OrdersService],
  controllers: [OrdersController],
})
export class OrdersModule {}