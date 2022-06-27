import { Collection, Entity, Enum, ManyToOne, OneToMany, PrimaryKey, Property } from "@mikro-orm/core";
import { User } from "../../users/entity/user";
import { UserAddress } from "../../users/entity/user.address";
import { Restaurant } from "../../restaurants/entities/restaurant";
import { OrderItem } from "./order.item";

@Entity()
export class Order {

    @PrimaryKey()
    orderId!: number;

    @Property({ onCreate: () => new Date() })
    orderDate!: Date;

    @Property()
    orderDoneDate?: Date;

    @ManyToOne(() => User)
    user!: User;

    @ManyToOne(() => UserAddress)
    userAddress!: UserAddress;

    @Property()
    shortAddress!: string;

    @Enum()
    orderStatus!: OrderStatus;

    @OneToMany(() => OrderItem, (item) => item.order)
    orderItems = new Collection<OrderItem>(this);

    @ManyToOne(() => Restaurant)
    restaurant!: Restaurant;

    @Property()
    comment?: string;
}

export enum OrderStatus {
    New = 'NEW',
    Doing = 'DOING',
    Done = 'DONE',
}