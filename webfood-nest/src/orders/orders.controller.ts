import { Body, Controller, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post } from '@nestjs/common';
import { OrderDto } from './dto/order.dto';
import { Order } from './entities/order';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {

    constructor(private _orderService: OrdersService) {}

    @Get()
    findAll(): OrderDto[] {
        return this._orderService.findAll();
    }

    @Get(':orderId')
    findOrderById(@Param('orderId', ParseIntPipe) id: number): OrderDto {
        const order = this._orderService.findOrderById(id);
        
        if(!order) {
            throw new HttpException('Order not found!', HttpStatus.NOT_FOUND);
        }

        return this.createOrderDto(order);
    }

    @Post()
    create(@Body() orderDto: OrderDto): OrderDto {
        const newOrder = this._orderService.create(orderDto);
        return this.createOrderDto(newOrder);
    }

    private createOrderDto(order: Order): OrderDto {
        const orderDto = new OrderDto();
        orderDto.orderId = order.orderId;  
        orderDto.orderDate = order.orderDate;
        orderDto.orderedItemIds = order.orderedItemIds;
        orderDto.userAddress = order.userAddress;
        orderDto.userId = order.userId;
        orderDto.isCompleted = order.isCompleted;

        return orderDto;
    }


    //TODO findOrdersByUserId, findOrdersByUserName, findOrdersByAddress, findOrdersByStatus
}
