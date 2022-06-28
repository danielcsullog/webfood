import { getRepositoryToken } from '@mikro-orm/nestjs';
import { Test, TestingModule } from '@nestjs/testing';
import { RestaurantsService } from '../restaurants/restaurants.service';
import { Restaurant } from '../restaurants/entities/restaurant';
import { Meal } from './entities/meal';
import { MealsService } from './meals.service';
import { User } from '../users/entity/user';
import { Order } from '../orders/entities/order';

describe('MealsService', () => {
  let service: MealsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MealsService,
        RestaurantsService,
        { provide: getRepositoryToken(Meal), useValue: {} },
        { provide: getRepositoryToken(Restaurant), useValue: {} },
        { provide: getRepositoryToken(User), useValue: {} },
        { provide: getRepositoryToken(Order), useValue: {} },
      ],
    }).compile();

    service = module.get<MealsService>(MealsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
