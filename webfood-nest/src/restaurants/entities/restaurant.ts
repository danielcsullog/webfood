import { Collection, Entity, Enum, OneToMany, PrimaryKey, Property } from "@mikro-orm/core";
import { Meal } from "../../meals/entities/meal";
import { Order } from "../../orders/entities/order";

@Entity()
export class Restaurant {

    @PrimaryKey()
    id: number;

    @Property()
    name: string;

    @Property()
    description: string;

    @Property()
    priceCategory: number;

    @Enum()
    category: RestaurantCategory;

    @Property()
    address: string;

    @Property()
    openingHours: string[];

    @Property()
    phoneNumber: string;

    @OneToMany(() => Order, (order) => order.restaurant)
    orders = new Collection<Order>(this);

    @OneToMany(() => Meal, (meal) => meal.restaurant)
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
