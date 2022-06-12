import { UniqueConstraintViolationException } from '@mikro-orm/core';
import { Body, Controller, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post, Query, UseGuards } from '@nestjs/common';
import { AllowAnonymous } from '../auth/allow-anonymus';
import { AuthService } from '../auth/auth.service';
import { LocalAuthGuard } from '../auth/local-auth.guard';
import { UserParam } from '../auth/user-param.decorator';
import { UserAuthDto } from './dto/user-auth.dto';
import { UserAddressDto } from './dto/user.address.dto';
import { UserDto } from './dto/user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(
        private usersService: UsersService,
        private authService: AuthService,
    ) { }

    @AllowAnonymous()
    @Post('')
    async create(@Body() userAuthDto: UserAuthDto) {
        try {
            const newUser = await this.usersService.createUser(userAuthDto);
            return new UserDto(newUser);
        } catch (e) {
            if (e instanceof UniqueConstraintViolationException) {
                throw new HttpException('UserName is already taken', HttpStatus.CONFLICT);
            } else {
                throw e;
            }

        }
    }

    @AllowAnonymous()
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@UserParam() user: UserDto) {
        return {
            user,
            access_token: await this.authService.generateJwt(user),
        };
    }

    @Post('addresses')
    async createAddress(@Body() userAddressDto: UserAddressDto) {
        const newAddress = await this.usersService.createAddress(userAddressDto);
        return new UserAddressDto(newAddress);
    }

    @Get('addresses')
    async findAllAddresses(
        @UserParam() userDto: UserDto,
    ): Promise<UserDto[]> {
        const addresses = await this.usersService.findAllAddress(userDto);
        return addresses.map(address => new UserAddressDto(address));
    }

    @Get('addresses/:addressId')
    async getAddresses(
        @Param('addressId', ParseIntPipe) id: number,
        @UserParam() userDto: UserDto,
        ): Promise<UserAddressDto> {
        const userAddress = await this.usersService.findAddressById(id, userDto);

        if(!userAddress) {
            throw new HttpException('UserAddress not found!', HttpStatus.NOT_FOUND);
        }

        return new UserAddressDto(userAddress);
    }
}
