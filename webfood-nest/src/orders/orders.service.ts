import { FilterQuery } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/sqlite';
import { Injectable } from '@nestjs/common';
import { UserDto } from 'src/users/dto/user.dto';
import { User, UserRole } from 'src/users/entity/user';
import { UserAddress } from 'src/users/entity/user.address';
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

        @InjectRepository(User)
        private userRepository: EntityRepository<User>,

        @InjectRepository(UserAddress)
        private userAddressRepository: EntityRepository<UserAddress>
    ) { }

    async findAll(user: UserDto, orderDto?: OrderDto): Promise<Order[]> {
        const filters: FilterQuery<Order> = { user };

        if (user.role === UserRole.User) {
            filters.user = { id: user.id }
        }

        return await this.orderRepository
            .find(filters, { populate: ['orderItems.meal', 'orderItems.amount', 'user'] });
    }

    async findOrderById(orderId: number, user: UserDto): Promise<Order> {
        const filters: FilterQuery<Order> = { orderId };
        if (user.role === UserRole.User) {
            filters.user = { id: user.id };
        }

        return await this.orderRepository
            .findOne(filters, { populate: ['orderItems.meal', 'orderItems.amount', 'user'] });
    }

    async create(orderDto: OrderDto, userDto: UserDto): Promise<Order> {
        const order = new Order();
        order.user = this.userRepository.getReference(userDto.id);
        order.userAddress = this.userAddressRepository.getReference(orderDto.userAddressId);        
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
        //await order.orderItems.init();
        await this.orderRepository.populate(order, ['orderItems', 'user', 'userAddress']);

        return order;
    }
}
