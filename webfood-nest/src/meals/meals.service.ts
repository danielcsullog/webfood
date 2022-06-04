import { Injectable } from '@nestjs/common';
import { MealDto } from './dto/meal.dto';

@Injectable()
export class MealsService {
  create(createMealDto: MealDto) {
    return 'This action adds a new meal';
  }

  findAll() {
    return `This action returns all meals`;
  }

  findOne(id: number) {
    return `This action returns a #${id} meal`;
  }

  update(id: number, updateMealDto: MealDto) {
    return `This action updates a #${id} meal`;
  }

  remove(id: number) {
    return `This action removes a #${id} meal`;
  }
}
