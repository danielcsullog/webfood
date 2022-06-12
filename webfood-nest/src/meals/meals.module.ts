import { Module } from '@nestjs/common';
import { MealsService } from './meals.service';
import { MealsController } from './meals.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Meal } from './entities/meal';
import { Restaurant } from '../restaurants/entities/restaurant';

@Module({
  imports: [MikroOrmModule.forFeature({ entities: [Meal, Restaurant]})],
  controllers: [MealsController],
  providers: [MealsService]
})
export class MealsModule {}
