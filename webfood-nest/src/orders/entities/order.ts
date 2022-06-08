import { Collection, Entity, Enum, ManyToMany, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { Meal } from "../../meals/entities/meal";
import { Restaurant } from "../../restaurants/entities/restaurant";

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

    @ManyToMany(() => Meal, (meal) => meal.orders)
    meals = new Collection<Meal>(this);

    @ManyToOne(() => Restaurant)
    restaurant!: Restaurant;
}

export enum OrderStatus {
    New = 'NEW',
    Doing = 'DOING',
    Done = 'DONE',
}