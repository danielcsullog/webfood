import { UniqueConstraintViolationException } from '@mikro-orm/core';
import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from '@nestjs/common';
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
    @Post()
    async create(@Body() userAuthDto: UserAuthDto) {
        try {
            const newUser = await this.usersService.createUser(userAuthDto);
            return new UserDto(newUser);
        } catch (e) {
            if (e instanceof UniqueConstraintViolationException) {
                throw new HttpException('Username is already in use.', HttpStatus.CONFLICT);
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

    @Get('current-user')
    getCurrentUser(
        @UserParam() user: UserDto
    ): UserDto {
        return user;
    }

    @Post('addresses')
    async createAddress(
        @Body() userAddressDto: UserAddressDto,
        @UserParam() userDto: UserDto
    ): Promise<UserAddressDto> {
        const newAddress = await this.usersService.createAddress(userAddressDto, userDto);
        return new UserAddressDto(newAddress);
    }

    @Get('addresses')
    async findAllAddresses(
        @UserParam() userDto: UserDto,
    ): Promise<UserAddressDto[]> {
        const addresses = await this.usersService.findAllAddress(userDto);
        return addresses.map(address => new UserAddressDto(address));
    }

    @Get('addresses/:addressId')
    async findOneAddress(
        @Param('addressId', ParseIntPipe) id: number,
        @UserParam() userDto: UserDto,
    ): Promise<UserAddressDto> {
        console.log(userDto.id);
        const userAddress = await this.usersService.findAddressById(id, userDto);

        if (!userAddress) {
            throw new HttpException('User address not found!', HttpStatus.NOT_FOUND);
        }

        return new UserAddressDto(userAddress);
    }

    @Patch('addresses/:addressId')
    async updateAddress(
        @Param('addressId', ParseIntPipe) id: number,
        @Body() userAddressDto: UserAddressDto,
        @UserParam() userDto: UserDto
    ): Promise<UserAddressDto> {
        const newAddress = await this.usersService
            .updateAddress(id, userAddressDto, userDto);

        if (!newAddress) {
            throw new HttpException('User address not found!', HttpStatus.NOT_FOUND);
        }

        return new UserAddressDto(newAddress);
    }

    @Delete('addresses/:addressId')
    async removeAddress(
        @Param('addressId', ParseIntPipe) id: number,
        @UserParam() userDto: UserDto
    ): Promise<UserAddressDto> {
        const deletedUserAddress = await this.usersService.removeAddress(id, userDto);

        if (!deletedUserAddress) {
            throw new HttpException('User address not found!', HttpStatus.NOT_FOUND);

        }

        return new UserAddressDto(deletedUserAddress);
    }
}
