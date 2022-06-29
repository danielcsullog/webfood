import { Module } from '@nestjs/common';
import { RequestsService } from './requests.service';
import { RequestsController } from './requests.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Restaurant } from '../restaurants/entities/restaurant';
import { User } from '../users/entities/user';
import { Request } from '../requests/entities/request'

@Module({
  imports: [MikroOrmModule.forFeature({ entities: [Request, Restaurant, User]})],
  controllers: [RequestsController],
  providers: [RequestsService],
})
export class RequestsModule {}
