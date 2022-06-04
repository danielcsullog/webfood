import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import mikroOrmConfig from 'mikro-orm.config';
import { OrdersModule } from './orders/orders.module';
import { MealsModule } from './meals/meals.module';
import { RestaurantsModule } from './restaurants/restaurants.module';

@Module({
  imports: [MikroOrmModule.forRoot(mikroOrmConfig), OrdersModule, MealsModule, RestaurantsModule],
})
export class AppModule {}
