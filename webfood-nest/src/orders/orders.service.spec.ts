import { getRepositoryToken } from '@mikro-orm/nestjs';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from '../users/entity/user';
import { Meal } from '../meals/entities/meal'
import { Restaurant } from '../restaurants/entities/restaurant';
import { Order } from './entities/order';
import { OrdersService } from './orders.service';
import { UserAddress } from '../users/entity/user.address';

describe('OrdersService', () => {
  let service: OrdersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrdersService, 
        { provide: getRepositoryToken(Order), useValue: {} },
        { provide: getRepositoryToken(Meal), useValue: {} },
        { provide: getRepositoryToken(Restaurant), useValue: {}},
        { provide: getRepositoryToken(User), useValue: {}},
        { provide: getRepositoryToken(UserAddress), useValue: {}},
      ]
    }).compile();

    service = module.get<OrdersService>(OrdersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
