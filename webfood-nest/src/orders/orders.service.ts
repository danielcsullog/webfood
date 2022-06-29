import { FilterQuery } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/sqlite';
import { Injectable } from '@nestjs/common';
import { UserDto } from '../users/dto/user.dto';
import { User, UserRole } from '../users/entities/user';
import { UserAddress } from '../users/entities/user.address';
import { Meal } from '../meals/entities/meal';
import { OrderDto } from './dto/order.dto';
import { Order, OrderStatus } from './entities/order';
import { OrderItem } from './entities/order.item';
import { Restaurant } from '../restaurants/entities/restaurant';

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
        private userAddressRepository: EntityRepository<UserAddress>,

        @InjectRepository(Restaurant)
        private restaurantRepository: EntityRepository<Restaurant>
    ) { }

    async findAll(user: UserDto, orderDto?: OrderDto): Promise<Order[]> {
        const filters: FilterQuery<Order> = { user };

        if (user.role === UserRole.User) {
            filters.user = { id: user.id }
        }

        return await this.orderRepository
            .find(filters, { populate: ['orderItems.meal', 'user', 'restaurant', 'userAddress'] });
    }

    async findOrderById(orderId: number, user: UserDto): Promise<Order> {
        const filters: FilterQuery<Order> = { orderId };
        if (user.role === UserRole.User) {
            filters.user = { id: user.id };
        }

        return await this.orderRepository
            .findOne(filters, { populate: ['orderItems', 'user'] });
    }

    async create(orderDto: OrderDto, userDto: UserDto): Promise<Order> {
        const order = new Order();
        order.user = this.userRepository.getReference(userDto.id);
        order.userAddress = await this.userAddressRepository.findOne(orderDto.userAddress);
        order.shortAddress = order.userAddress.city
            + " " +
            order.userAddress.street
            + " " +
            order.userAddress.houseNumber;
        order.orderStatus = OrderStatus.New;
        order.restaurant = this.restaurantRepository.getReference(orderDto.restaurantId);

        if (orderDto.orderItems) {
            for (const item of orderDto.orderItems) {
                const newOrderItem = new OrderItem();
                newOrderItem.order = order;
                newOrderItem.meal = this.mealRepository.getReference(item.meal.id);
                newOrderItem.amount = item.amount;
                order.orderItems.add(newOrderItem);
            }
        }

        if (orderDto.comment) {
            order.comment = orderDto.comment;
        }

        await this.orderRepository.persistAndFlush(order);
        await this.orderRepository.populate(order, ['orderItems', 'user', 'restaurant']);

        return order;
    }

    async update(
        orderId: number,
        orderDto: OrderDto,
        user: UserDto
    ): Promise<Order> {
        const filters: FilterQuery<Order> = { orderId };

        if (user.role === UserRole.User) {
            filters.user = { id: user.id };
        }

        const order = await this.orderRepository.findOne(filters, {
            populate: ['orderItems', 'userAddress', 'restaurant']
        });


        if (!order || order.orderStatus !== OrderStatus.New) {
            return;
        }

        if (orderDto.userAddress) {
            order.userAddress = await this.userAddressRepository
                .findOne(orderDto.userAddress.id) || order.userAddress;
            order.shortAddress = order.userAddress.city + " " +
                order.userAddress.street + " " +
                order.userAddress.houseNumber;
        }

        order.orderStatus = OrderStatus.New;

        if (orderDto.orderItems && orderDto.orderItems.length > 0) {
            order.orderItems.removeAll();
            for (const item of orderDto.orderItems) {
                const newOrderItem = new OrderItem();
                newOrderItem.order = order;
                newOrderItem.meal = this.mealRepository.getReference(item.meal.id);
                newOrderItem.amount = item.amount;
                order.orderItems.add(newOrderItem);
            }
        }

        if (orderDto.comment) {
            order.comment = orderDto.comment;
        }

        await this.orderRepository.persistAndFlush(order);
        await this.orderRepository.populate(order, ['orderItems', 'user', 'userAddress']);

        return order;
    }

    async remove(orderId: number, userDto: UserDto): Promise<Order> {
        const order = await this.orderRepository.findOne({ orderId }, {
            populate: ['user']
        });
        if (!order ||
            order.orderStatus !== OrderStatus.New ||
            order.user.id != userDto.id
        ) {
            return;
        }

        await this.orderRepository.removeAndFlush(order);

        return order;
    }
}
