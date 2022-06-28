import { FilterQuery } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/sqlite';
import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { UserAuthDto } from './dto/user-auth.dto';
import { UserAddressDto } from './dto/user.address.dto';
import { UserDto } from './dto/user.dto';
import { User, UserRole } from './entity/user';
import { UserAddress } from './entity/user.address';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User)
        private userRepository: EntityRepository<User>,

        @InjectRepository(UserAddress)
        private userAddressRepository: EntityRepository<UserAddress>,

        private authService: AuthService,
    ) { }

    async createUser(userAuthDto: UserAuthDto): Promise<User> {
        const user = new User();

        user.name = userAuthDto.name;
        user.userName = userAuthDto.userName;
        user.password = await this.authService.hashPassword(userAuthDto.password);
        user.role = UserRole.User;

        await this.userRepository.persistAndFlush(user);

        return user;
    }

    async createAddress(
        userAddressDto: UserAddressDto,
        user: UserDto
    ): Promise<UserAddress> {
        const address = new UserAddress();

        address.user = this.userRepository.getReference(user.id);
        address.zipCode = userAddressDto.zipCode;
        address.city = userAddressDto.city;
        address.street = userAddressDto.street;
        address.houseNumber = userAddressDto.houseNumber;
        address.staircase = userAddressDto.staircase | 0;
        address.doorbell = userAddressDto.doorbell | 0;
        address.floor = userAddressDto.floor | 0;
        address.doorNumber = userAddressDto.doorNumber | 0;
        address.note = userAddressDto.note || "";

        await this.userAddressRepository.persistAndFlush(address);
        await this.userAddressRepository.populate(address, ['user']);

        return address;
    }

    async findAllAddress(user: UserDto): Promise<UserAddress[]> {
        const filters: FilterQuery<UserAddress> = { user };

        if (user.role === UserRole.User) {
            filters.user = { id: user.id };
        }

        return await this.userAddressRepository.find(filters, {
            populate: ['user']
        });
    }

    async findAddressById(
        addressId: number,
        user: UserDto
    ): Promise<UserAddress> {
        const filters: FilterQuery<UserAddress> = { id: addressId };
        if (user.role === UserRole.User) {
            filters.user = { id: user.id };
        }
        return await this.userAddressRepository.findOne(filters, {
            populate: ['user']
        });
    }

    async updateAddress(
        addressId: number,
        userAddressDto: UserAddressDto,
        user: UserDto
    ): Promise<UserAddress> {
        const filters: FilterQuery<UserAddress> = { id: addressId };

        if (user.role === UserRole.User) {
            filters.user = { id: user.id };
        }

        const address = await this.userAddressRepository.findOne(filters);

        if (!address) {
            return;
        }

        address.zipCode = userAddressDto.zipCode || address.zipCode;
        address.city = userAddressDto.city || address.city;
        address.street = userAddressDto.street || address.street;
        address.houseNumber = userAddressDto.houseNumber || address.houseNumber;
        address.staircase = userAddressDto.staircase || address.staircase;
        address.doorbell = userAddressDto.doorbell || address.doorbell;
        address.floor = userAddressDto.floor || address.floor;
        address.doorNumber = userAddressDto.doorNumber || address.doorNumber;
        address.note = userAddressDto.note || address.note;

        await this.userAddressRepository.persistAndFlush(address);
        await this.userAddressRepository.populate(address, ['user']);

        return address;
    }

    async removeAddress(addressId: number, user: UserDto): Promise<UserAddress> {
        const filters: FilterQuery<UserAddress> = { id: addressId };
        if (user.role === UserRole.User) {
            filters.user = { id: user.id };
        }

        const userAddress = await this.userAddressRepository.findOne(filters);

        if (!userAddress) {
            return;
        }

        await this.userAddressRepository.removeAndFlush(userAddress);

        return userAddress;
    }
}
