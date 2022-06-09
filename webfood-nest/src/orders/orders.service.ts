import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/sqlite';
import { Injectable } from '@nestjs/common';
import { Meal } from '../meals/entities/meal';
import { OrderDto } from './dto/order.dto';
import { Order, OrderStatus } from './entities/order';
import { OrderItem } from './entities/order.item';

@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(Order)
        private orderRepository: EntityRepository<Order>,

        @InjectRepository(Meal)
        private mealRepository: EntityRepository<Meal>,
    ) { }

    async findAll(orderDto?: OrderDto): Promise<Order[]> {
        return await this.orderRepository
            .find(orderDto, { populate: ['orderItems.meal', 'orderItems.amount'] });
    }

    async findOrderById(orderId: number): Promise<Order> {
        return await this.orderRepository
            .findOne({ orderId }, { populate: ['orderItems.meal', 'orderItems.amount'] });
    }

    async create(orderDto: OrderDto): Promise<Order> {
        const order = new Order();
        order.userId = orderDto.userId;
        order.userAddress = orderDto.userAddress;
        order.orderStatus = OrderStatus.New;
        order.restaurant = orderDto.restaurant;

        if (orderDto.orderItems) {
            for (const item of orderDto.orderItems) {
                const newOrderItem = new OrderItem();
                newOrderItem.order = order;
                newOrderItem.meal = this.mealRepository.getReference(item.mealId);
                newOrderItem.amount = item.amount;
                order.orderItems.add(newOrderItem);
            }
        }

        await this.orderRepository.persistAndFlush(order);
        //await order.meals.init();
        await order.orderItems.init();

        return order;
    }
}
