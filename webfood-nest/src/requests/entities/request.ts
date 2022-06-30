import { Entity, Enum, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { Restaurant } from "../../restaurants/entities/restaurant";
import { User } from "../../users/entities/user";

@Entity()
export class Request {

    @PrimaryKey()
    id!: number;

    @Property({ onCreate: () => new Date() })
    creationDate!: Date;

    @Property({ nullable: true })
    completionDate?: Date;

    @ManyToOne(() => User)
    user!: User;

    @Enum()
    type!: RequestType;

    @Enum()
    status!: RequestStatus;

    @ManyToOne(() => Restaurant)
    restaurant!: Restaurant;

    @Property()
    text?: string;

    @Property()
    userToFireId?: number;
}

export enum RequestType {
    RestaurantCreation = 'CREATE_RESTAURANT',
    RestaurantDelete = 'DELETE_RESTAURANT',
    RestaurantEdit = 'EDIT_RESTAURANT',
    JobApplication = 'APPLICATION_JOB',
    JobResign = 'RESIGN_JOB',
    JobFireEmployee = 'FIRE_EMPLOYEE_JOB',
}

export enum RequestStatus {
    Sent = 'SENT',
    Viewed = 'VIEWED',
    InProgress = 'IN_PROGRESS',
    Refused = 'REFUSED',
    Accepted = 'ACCEPTED',
}