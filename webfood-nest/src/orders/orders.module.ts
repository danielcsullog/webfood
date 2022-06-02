import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Order } from './entities/order';

@Module({
  imports: [MikroOrmModule.forFeature({ entities: [Order]})],
  providers: [OrdersService],
  controllers: [OrdersController],
})
export class OrdersModule {}
