import { Collection, Entity, Enum, ManyToMany, ManyToOne, OneToMany, PrimaryKey, Property } from "@mikro-orm/core";
import { Meal } from "../../meals/entities/meal";
import { Restaurant } from "../../restaurants/entities/restaurant";
import { OrderItem } from "./order.item";

@Entity()
export class Order {

    @PrimaryKey()
    orderId!: number;

    @Property({ onCreate: () => new Date() })
    orderDate!: Date;

    @Property()
    userId!: number;

    @Property()
    userAddress!: string;

    @Enum()
    orderStatus!: OrderStatus;

    @OneToMany(() => OrderItem, (item) => item.order)
    orderItems = new Collection<OrderItem>(this);

    @ManyToOne(() => Restaurant)
    restaurant!: Restaurant;
}

export enum OrderStatus {
    New = 'NEW',
    Doing = 'DOING',
    Done = 'DONE',
}