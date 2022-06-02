import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import mikroOrmConfig from 'mikro-orm.config';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [MikroOrmModule.forRoot(mikroOrmConfig), OrdersModule],
})
export class AppModule {}
