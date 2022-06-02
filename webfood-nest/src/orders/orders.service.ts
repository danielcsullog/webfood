import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/sqlite';
import { Injectable } from '@nestjs/common';
import { OrderDto } from './dto/order.dto';
import { Order } from './entities/order';
import { OrderBuilder } from './entities/orderBuilder';

@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(Order)
        private orderRepository: EntityRepository<Order>
    ) {}

    async findAll(orderDto?: OrderDto): Promise<Order[]> {
        return await this.orderRepository.find(orderDto);
    }

    async findOrderById(orderId: number): Promise<Order> {
        return await this.orderRepository.findOne({ orderId });
    }

    async create(orderDto: OrderDto): Promise<Order> {
        const order = new OrderBuilder().order()
            .withDate(orderDto.orderDate)
            .withOrderedItemIds(orderDto.orderedItemIds)
            .withUserAddress(orderDto.userAddress)
            .withUserId(orderDto.userId)
            .withCompletionStatus(false)
            .build();

        await this.orderRepository.persistAndFlush(order);

        return order;
    }

    //TODO findOrdersByUserId, findOrdersByUserName, findOrdersByAddress, findOrdersByStatus
}
