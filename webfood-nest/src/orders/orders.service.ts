import { Injectable } from '@nestjs/common';
import { OrderDto } from './dto/order.dto';
import { Order } from './entities/order';
import { OrderBuilder } from './entities/orderBuilder';

@Injectable()
export class OrdersService {

    private _orders: Order[] = [];
    private _nextId = 1;

    /*setNextIdOnAppStart(): number {
        //TODO: get last known id from DB, then +1;
        this._nextId = 1;
        return this._nextId;
    }*/

    findAll(): Order[] {
        return this._orders;
    }

    findOrderById(id: number): Order {
        return this._orders.find(order => order.orderId === id);
    }

    create(orderDto: OrderDto): Order {
        const order = new OrderBuilder().order()
            .withId(this._nextId)
            .withDate(orderDto.orderDate)
            .withOrderedItemIds(orderDto.orderedItemIds)
            .withUserAddress(orderDto.userAddress)
            .withUserId(orderDto.userId)
            .withCompletionStatus(false)
            .build();
        
        this._nextId += 1;
        this._orders.push(order);

        return order;
    }

    //TODO findOrdersByUserId, findOrdersByUserName, findOrdersByAddress, findOrdersByStatus
}
