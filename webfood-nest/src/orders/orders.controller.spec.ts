import { Test, TestingModule } from '@nestjs/testing';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';

describe('OrdersController', () => {
  let controller: OrdersController;
  let ordersService: any;

  beforeEach(async () => {
    ordersService = {
      create: jest.fn(),
      findAll: jest.fn(),
      findOne: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdersController],
      providers: [{ provide: OrdersService, useValue: ordersService}]
    }).compile();

    controller = module.get<OrdersController>(OrdersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should give empty array when no orders have been created', () => {
    ordersService.findAll.mockReturnValue([]);
    expect(controller.findAll({})).resolves.toEqual([]);
  })

  it('should throw an error when the requested issue is missing', () => {
    ordersService.findOne.mockReturnValue(undefined);
    expect(controller.findOrderById(1)).rejects.toThrow();
  })
});
