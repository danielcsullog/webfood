import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User, UserRole } from '../users/entities/user';
import { UserDto } from '../users/dto/user.dto';

export function getUserFromRequest(ctx: ExecutionContext) {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user as UserDto;

    return user;
}

export const UserParam = createParamDecorator(
    (_: never, ctx: ExecutionContext) => {
        //const user = new User();
        //user.id = 2;
        //user.role = UserRole.Admin;
        //return user;
        return getUserFromRequest(ctx);
    },
);
