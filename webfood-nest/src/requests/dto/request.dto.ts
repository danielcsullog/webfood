import { UserDto } from "../../users/dto/user.dto";
import { Request, RequestStatus, RequestType } from "../entities/request";

export class RequestDto {
    id?: number;
    creationDate?: Date;
    completionDate?: Date;
    user?: UserDto;
    type?: RequestType;
    status?: RequestStatus;
    restaurantId: number;
    text?: string;
    userToFireId?: number;

    constructor(request?: Request) {
        if (request) {
            this.id = request.id;
            this.creationDate = request.creationDate;
            this.completionDate = request.completionDate;
            this.user = new UserDto(request.user);
            this.type = request.type;
            this.status = request.status;
            this.restaurantId = request.restaurant.id;
            this.text = request.text;
            this.userToFireId = request.userToFireId;
        }
    }
}