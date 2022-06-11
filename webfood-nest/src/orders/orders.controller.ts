import { Body, Controller, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { UserParam } from 'src/auth/user-param.decorator';
import { UserDto } from 'src/users/dto/user.dto';
import { OrderDto } from './dto/order.dto';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {

    constructor(private _orderService: OrdersService) { }

    @Get()
    async findAll(
        @Query() orderDto: OrderDto,
        @UserParam() userDto: UserDto,
    ): Promise<OrderDto[]> {
        const orders = await this._orderService.findAll(userDto, orderDto);
        return orders.map(order => new OrderDto(order));
    }

    @Get(':orderId')
    async findOrderById(
        @Param('orderId', ParseIntPipe) id: number,
        @UserParam() userDto: UserDto,
    ): Promise<OrderDto> {
        const order = await this._orderService.findOrderById(id, userDto);

        if (!order) {
            throw new HttpException('Order not found!', HttpStatus.NOT_FOUND);
        }

        return new OrderDto(order);
    }

    @Post()
    async create(
        @Body() orderDto: OrderDto,
        @UserParam() userDto: UserDto,
    ): Promise<OrderDto> {
        const newOrder = await this._orderService.create(orderDto, userDto);
        return new OrderDto(newOrder);
    }

}
