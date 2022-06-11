import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { User } from './entity/user';
import { UserAddress } from './entity/user.address';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [MikroOrmModule.forFeature({ entities: [User, UserAddress]}), AuthModule],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
