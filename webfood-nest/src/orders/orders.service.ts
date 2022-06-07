import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/sqlite';
import { Injectable } from '@nestjs/common';
import { Meal } from '../meals/entities/meal';
import { Restaurant } from '../restaurants/entities/restaurant';
import { OrderDto } from './dto/order.dto';
import { Order, OrderStatus } from './entities/order';

@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(Order)
        private orderRepository: EntityRepository<Order>, 
        
        @InjectRepository(Meal)
        private mealRepository: EntityRepository<Meal>,
        
        @InjectRepository(Restaurant)
        private restaurantRepository: EntityRepository<Restaurant>
    ) {}

    async findAll(orderDto?: OrderDto): Promise<Order[]> {
        return await this.orderRepository.find(orderDto);
    }

    async findOrderById(orderId: number): Promise<Order> {
        return await this.orderRepository.findOne({ orderId });
    }

    async create(orderDto: OrderDto): Promise<Order> {
        const order = new Order();
        order.userId = orderDto.userId;
        order.userAddress = orderDto.userAddress;
        order.orderStatus = OrderStatus.New;

        if (orderDto.meals) {
            order.meals.set(
                orderDto.meals.map((meal) => 
                    this.mealRepository.getReference(meal.id),
                ),
            );
        }

        if(orderDto.restaurants) {
            order.restaurants.set(
                orderDto.restaurants.map((restaurant) => 
                    this.restaurantRepository.getReference(restaurant.id),
                ),
            );
        }

        await this.orderRepository.persistAndFlush(order);
        await order.meals.init();
        await order.restaurants.init();

        return order;
    }
}
