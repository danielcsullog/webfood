import { Body, Controller, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { OrderDto } from './dto/order.dto';
import { Order } from './entities/order';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {

    constructor(private _orderService: OrdersService) {}

    @Get()
    async findAll(@Query() orderDto: OrderDto): Promise<OrderDto[]> {
        return await this._orderService.findAll(orderDto);
    }

    @Get(':orderId')
    async findOrderById(@Param('orderId', ParseIntPipe) id: number): Promise<OrderDto> {
        const order = await this._orderService.findOrderById(id);
        
        if(!order) {
            throw new HttpException('Order not found!', HttpStatus.NOT_FOUND);
        }

        return this.createOrderDto(order);
    }

    @Post()
    async create(@Body() orderDto: OrderDto): Promise<OrderDto> {
        const newOrder = await this._orderService.create(orderDto);
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
