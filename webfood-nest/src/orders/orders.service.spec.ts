import { getRepositoryToken } from '@mikro-orm/nestjs';
import { Test, TestingModule } from '@nestjs/testing';
import { Meal } from '../meals/entities/meal'
import { Restaurant } from '../restaurants/entities/restaurant';
import { Order } from './entities/order';
import { OrdersService } from './orders.service';

describe('OrdersService', () => {
  let service: OrdersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrdersService, 
        { provide: getRepositoryToken(Order), useValue: {} },
        { provide: getRepositoryToken(Meal), useValue: {} },
        { provide: getRepositoryToken(Restaurant), useValue: {}}
      ]
    }).compile();

    service = module.get<OrdersService>(OrdersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
