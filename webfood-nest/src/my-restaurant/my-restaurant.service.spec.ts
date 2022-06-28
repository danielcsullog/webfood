import { Test, TestingModule } from '@nestjs/testing';
import { MyRestaurantService } from './my-restaurant.service';

describe('MyRestaurantService', () => {
  let service: MyRestaurantService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MyRestaurantService],
    }).compile();

    service = module.get<MyRestaurantService>(MyRestaurantService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
