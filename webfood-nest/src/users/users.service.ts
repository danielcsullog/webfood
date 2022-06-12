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

    async createUser(userAuthDto: UserAuthDto) {
        const user = new User();

        user.name = userAuthDto.name;
        user.userName = userAuthDto.userName;
        user.password = await this.authService.hashPassword(userAuthDto.password);
        user.role = UserRole.User;

        await this.userRepository.persistAndFlush(user);

        return user;
    }

    async createAddress(userAddressDto: UserAddressDto) {
        const address = new UserAddress();

        address.user = await this.userRepository.getReference(userAddressDto.userId);
        address.zipCode = userAddressDto.zipCode;
        address.city = userAddressDto.city;
        address.street = userAddressDto.street;
        address.houseNumber = userAddressDto.houseNumber;
        address.staircase = userAddressDto.staircase;
        address.doorbell = userAddressDto.doorbell;
        address.floor = userAddressDto.floor;
        address.doorNumber = userAddressDto.doorNumber;
        address.note = userAddressDto.note;

        await this.userRepository.persistAndFlush(address);

        return address;
    }

    async findAllAddress(user: UserDto) {
        const filters: FilterQuery<UserAddress> = { user };

        if(user.role !== UserRole.Admin) {
            filters.user = { id: user.id };
        }

        return await this.userAddressRepository.find(filters);
    }

    async findAddressById(id: number, user: UserDto) {
        const filters: FilterQuery<UserAddress> = { id };
        if (user.role !== UserRole.Admin) {
            filters.user = { id: user.id };
        }

        return await this.userAddressRepository.findOne(filters);
    }
    
}
