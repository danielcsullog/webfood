import { Body, Controller, Get, HttpException, HttpStatus, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { Roles } from '../auth/roles';
import { UserParam } from '../auth/user-param.decorator';
import { RestaurantDto } from '../restaurants/dto/restaurant.dto';
import { UserDto } from '../users/dto/user.dto';
import { User, UserRole } from '../users/entities/user';
import { RequestDto } from './dto/request.dto';
import { RequestsService } from './requests.service';

@Controller('requests')
export class RequestsController {
    constructor(
        private readonly requestService: RequestsService
    ) { }

    @Post()
    async create(
        @Body() requestDto: RequestDto,
        @UserParam() userDto: UserDto
    ): Promise<RequestDto> {
        const newRequest = await this.requestService.create(requestDto, userDto);
        return new RequestDto(newRequest);
    }

    @Get()
    async findAll(
        @UserParam() userDto: User
    ): Promise<RequestDto[]> {
        const requests = await this.requestService.findAll(userDto);
        return requests.map((request) => new RequestDto(request));
    }


    @Get('user')
    async findAllByUser(
        @UserParam() userDto: UserDto
    ): Promise<RequestDto[]> {
        const requests = await this.requestService
            .findAllByUser(userDto);

        if (!requests) {
            throw new HttpException(
                'User not found!',
                HttpStatus.NOT_FOUND
            );
        }

        return requests.map((request) => new RequestDto(request));
    }

    @Post('restaurant')
    @Roles(UserRole.Admin)
    async findAllByRestaurant(
        @Body() restaurantDto: RestaurantDto
    ): Promise<RequestDto[]> {
        const requests = await this.requestService
            .findAllByRestaurant(restaurantDto);

        if (!requests) {
            throw new HttpException(
                'Restaurant not found!',
                HttpStatus.NOT_FOUND
            );
        }

        return requests.map((request) => new RequestDto(request));
    }

    @Patch(':id')
    @Roles(UserRole.Admin)
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateRequestDto: RequestDto,
    ): Promise<RequestDto> {
        const updatedRequest = await this.requestService
            .update(id, updateRequestDto);

        if (!updatedRequest) {
            throw new HttpException(
                'Update failed. Request not found!',
                HttpStatus.NOT_FOUND
            );
        }
        return new RequestDto(updatedRequest);
    }
}
