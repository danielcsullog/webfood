import { Collection, Entity, Enum, ManyToMany, OneToMany, PrimaryKey, Property } from "@mikro-orm/core";
import { Meal } from "../../meals/entities/meal";
import { Order } from "../../orders/entities/order";

@Entity()
export class Restaurant {

    @PrimaryKey()
    id!: number;

    @Property({ unique: true})
    name!: string;

    @Property()
    description!: string;

    @Property()
    priceCategory!: number;

    @Enum()
    category!: RestaurantCategory;

    @Property()
    address!: string;

    @Property()
    openingHours!: string[];

    @Property()
    phoneNumber!: string;

    @OneToMany(() => Order, (order) => order.restaurants)
    orders = new Collection<Order>(this);

    @ManyToMany(() => Meal, (meal) => meal.restaurant)
    meals = new Collection<Meal>(this);
}

export enum RestaurantCategory {
    Fast = 'FASTFOOD',
    Street = 'STREETFOOD',
    Buffet = 'BUFFET',
    Bistro = 'BISTRO',
    Bakery = 'BAKERY',
    Confectionary = 'CONFECTIONARY',
    Canteen = 'CANTEEN',
    Fine = 'FINEDINING',
    Cafe = 'CAFE'
}
