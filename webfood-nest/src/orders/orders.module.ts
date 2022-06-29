import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Order } from './entities/order';
import { Restaurant } from '../restaurants/entities/restaurant';
import { Meal } from '../meals/entities/meal';
import { OrderItem } from './entities/order.item';
import { User } from '../users/entities/user';
import { UserAddress } from '../users/entities/user.address';

@Module({
  imports: [MikroOrmModule.forFeature({ 
    entities: [
      Order, 
      Meal, 
      Restaurant, 
      OrderItem, 
      User,
      UserAddress,
      ]
    })
  ],
  providers: [OrdersService],
  controllers: [OrdersController],
})
export class OrdersModule {}
