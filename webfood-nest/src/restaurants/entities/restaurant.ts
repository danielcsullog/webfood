import { Collection, Entity, Enum, ManyToMany, ManyToOne, OneToMany, PrimaryKey, Property } from "@mikro-orm/core";
import { User } from "../../users/entities/user";
import { Meal } from "../../meals/entities/meal";
import { Order } from "../../orders/entities/order";
import { Request } from "../../requests/entities/request";

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

    @OneToMany(() => Order, (order) => order.restaurant)
    orders = new Collection<Order>(this);

    @ManyToMany(() => Meal, (meal) => meal.restaurants)
    meals = new Collection<Meal>(this);

    @ManyToOne(() => User)
    owner!: User;

    @ManyToMany(() => User)
    workers = new Collection<User>(this);

    @OneToMany(() => Request, (request) => request.restaurant)
    requests = new Collection<Request>(this);
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
