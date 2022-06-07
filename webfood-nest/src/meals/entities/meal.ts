import { Collection, Entity, ManyToMany, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { Order } from "../../orders/entities/order"
import { Restaurant } from "../../restaurants/entities/restaurant";

@Entity()
export class Meal {

    @PrimaryKey()
    id!: number;

    @Property({ unique: true })
    name!: string;

    @Property()
    price!: number;

    @Property()
    description!: string;

    @Property()
    category!: string;

    @Property()
    isVegan!: boolean;

    @Property()
    isSpicy!: boolean;

    @Property()
    isVegetarian!: boolean;

    @Property()
    isLactoseFree!: boolean;

    @Property()
    isGlutenFree!: boolean;

    @Property()
    isSugarFree!: boolean;

    @ManyToMany(() => Order)
    orders = new Collection<Order>(this);

    @ManyToMany(() => Restaurant)
    restaurant = new Collection<Restaurant>(this);
}
