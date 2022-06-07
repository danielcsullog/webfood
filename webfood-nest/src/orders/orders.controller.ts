import { Body, Controller, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { Restaurant } from 'src/restaurants/entities/restaurant';
import { OrderDto } from './dto/order.dto';
import { Order, OrderStatus } from './entities/order';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {

    constructor(private _orderService: OrdersService) { }

    @Get()
    async findAll(@Query() orderDto: OrderDto): Promise<OrderDto[]> {
        const orders = await this._orderService.findAll(orderDto);
        return orders.map(order => new OrderDto(order));
    }

    @Get(':orderId')
    async findOrderById(@Param('orderId', ParseIntPipe) id: number): Promise<OrderDto> {
        const order = await this._orderService.findOrderById(id);

        if (!order) {
            throw new HttpException('Order not found!', HttpStatus.NOT_FOUND);
        }

        return new OrderDto(order);
    }

    @Post()
    async create(@Body() orderDto: OrderDto): Promise<OrderDto> {
        const newOrder = await this._orderService.create(orderDto);
        return new OrderDto(newOrder);
    }

}
