import { Test, TestingModule } from '@nestjs/testing';
import { MyRestaurantController } from './my-restaurant.controller';
import { MyRestaurantService } from './my-restaurant.service';

describe('MyRestaurantController', () => {
  let controller: MyRestaurantController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MyRestaurantController],
      providers: [{ provide: MyRestaurantService, useValue: {} }],
    }).compile();

    controller = module.get<MyRestaurantController>(MyRestaurantController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
