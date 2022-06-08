import { getRepositoryToken } from '@mikro-orm/nestjs';
import { Test, TestingModule } from '@nestjs/testing';
import { Restaurant } from '../restaurants/entities/restaurant';
import { Meal } from './entities/meal';
import { MealsService } from './meals.service';

describe('MealsService', () => {
  let service: MealsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MealsService,
        { provide: getRepositoryToken(Meal), useValue: {} },
        { provide: getRepositoryToken(Restaurant), useValue: {} },
      ],
    }).compile();

    service = module.get<MealsService>(MealsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
