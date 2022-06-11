import { IDatabaseDriver, Options } from "@mikro-orm/core";
import { Meal } from "./src/meals/entities/meal";
import { Restaurant } from "./src/restaurants/entities/restaurant";
import { Order } from "./src/orders/entities/order";
import { OrderItem } from "./src/orders/entities/order.item";
import { UserAddress } from "./src/users/entity/user.address";
import { User } from "./src/users/entity/user";

export default {
    entities: [
        Order, 
        Restaurant, 
        Meal, 
        OrderItem,
        User,
        UserAddress
    ],
    dbName: 'webfood.sqlite3',
    type: 'sqlite',
} as Options<IDatabaseDriver>;