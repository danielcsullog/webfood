import { getRepositoryToken } from '@mikro-orm/nestjs';
import { Test, TestingModule } from '@nestjs/testing';
import { Restaurant } from '../entities/restaurant';
import { MyRestaurantService } from './my-restaurant.service';

describe('MyRestaurantService', () => {
  let service: MyRestaurantService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MyRestaurantService,
        { provide: getRepositoryToken(Restaurant), useValue: {} },
      ],
    }).compile();

    service = module.get<MyRestaurantService>(MyRestaurantService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
