import { RequestType } from "../requests/request-editor/request-editor.component";
import { Restaurant } from "./restaurant";
import { User } from "./user";

export interface Request {
    id?: number;
    creationDate?: Date;
    completionDate?: Date;
    user: User;
    type: RequestType | null;
    status?: RequestStatus;
    restaurantId: number;
    text?: string;
    userToFireId?: number;
}

export enum RequestStatus {
    Sent = 'SENT',
    Viewed = 'VIEWED',
    InProgress = 'IN_PROGRESS',
    Refused = 'REFUSED',
    Accepted = 'ACCEPTED',
}