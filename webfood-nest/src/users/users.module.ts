import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { Request } from '../requests/entities/request';
import { AuthModule } from '../auth/auth.module';
import { User } from './entities/user';
import { UserAddress } from './entities/user.address';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [MikroOrmModule.forFeature({ entities: [User, UserAddress, Request]}), AuthModule],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
