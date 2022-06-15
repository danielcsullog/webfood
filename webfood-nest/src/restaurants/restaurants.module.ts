import { Module } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { RestaurantsController } from './restaurants.controller';
import { Restaurant } from './entities/restaurant';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { UsersService } from '../users/users.service';
import { User } from '../users/entity/user';

@Module({
  imports: [MikroOrmModule.forFeature({ entities: [Restaurant, User]})],
  controllers: [RestaurantsController],
  providers: [RestaurantsService]
})
export class RestaurantsModule {}
