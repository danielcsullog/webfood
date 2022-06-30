import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/sqlite';
import { Injectable } from '@nestjs/common';
import { RestaurantDto } from '../restaurants/dto/restaurant.dto';
import { UserDto } from '../users/dto/user.dto';
import { RequestDto } from './dto/request.dto';
import { Request, RequestStatus, RequestType } from '../requests/entities/request';
import { User, UserRole } from '../users/entities/user';
import { Restaurant } from '../restaurants/entities/restaurant';
import { FilterQuery } from '@mikro-orm/core';

@Injectable()
export class RequestsService {

    constructor(
        @InjectRepository(Request)
        private requestRepository: EntityRepository<Request>,

        @InjectRepository(User)
        private userRepository: EntityRepository<User>,

        @InjectRepository(Restaurant)
        private restaurantRepository: EntityRepository<Restaurant>,
    ) { }

    async create(
        requestDto: RequestDto,
        user: UserDto
    ): Promise<Request> {
        const request = new Request();
        request.id = requestDto.id;
        request.user = this.userRepository.getReference(user.id);
        request.type = requestDto.type;
        request.status = requestDto.status;
        request.restaurant = this.restaurantRepository.getReference(requestDto.restaurantId);
        request.text = requestDto.text;
        request.userToFireId = requestDto.userToFireId;

        await this.requestRepository.persistAndFlush(request);
        await this.requestRepository.populate(request, ['user', 'restaurant']);

        return request;
    }

    async findAll(
        userDto: UserDto
    ): Promise<Request[]> {

        if (userDto.role === UserRole.User) {
            const filters: FilterQuery<Request> = { user:userDto }
            filters.user = { id: userDto.id }
            return await this.requestRepository
            .find(filters, {
                populate: ['user', 'restaurant']
            });
        } else {
            return await this.requestRepository
            .findAll({
                populate: ['user', 'restaurant']
            });
        }

        
    }

    async findAllByUser(
        userDto: UserDto
    ): Promise<Request[]> {
        const filters: FilterQuery<Request> = { user: userDto };

        return await this.requestRepository
            .find(filters, {
                populate: ['user', 'restaurant']
            });
    }

    async findAllByRestaurant(
        restaurantDto: RestaurantDto
    ): Promise<Request[]> {
        const restaurant = await this.restaurantRepository
            .findOne(restaurantDto.id);
        if (!restaurant) {
            return;
        }
        const filters: FilterQuery<Request> = { restaurant };

        return await this.requestRepository
            .find(filters, {
                populate: ['user', 'restaurant']
            });
    }


    async update(
        id: number,
        updateRequestDto: RequestDto
    ): Promise<Request> {
        const request = await this.requestRepository.findOne(id, {
            populate: ['user', 'restaurant']
        });

        if (!request) {
            return;
        }

        if (updateRequestDto.status === RequestStatus.Accepted ||
            updateRequestDto.status === RequestStatus.Refused) {
            request.completionDate = updateRequestDto.completionDate || request.completionDate;
        }

        request.status = updateRequestDto.status || request.status;
        
        await this.requestRepository.persistAndFlush(request);
        await this.requestRepository.populate(request, ['user', 'restaurant']);

        return request;
    }
}
