import { IDatabaseDriver, Options } from "@mikro-orm/core";
import { Meal } from "./src/meals/entities/meal";
import { Restaurant } from "./src/restaurants/entities/restaurant";
import { Order } from "./src/orders/entities/order";
import { OrderItem } from "./src/orders/entities/order.item";
import { UserAddress } from "./src/users/entities/user.address";
import { User } from "./src/users/entities/user";
import { Request } from "./src/requests/entities/request";

export default {
    entities: [
        Order, 
        Restaurant, 
        Meal, 
        OrderItem,
        User,
        UserAddress,
        Request
    ],
    dbName: (process.env.seed ? './dist/' : '') + process.env.dbName,
    type: 'sqlite',
    migrations: {
        path: 'migrations',
        pattern: /^[\w-]+\d+\.(ts|js)$/,
    },
} as Options<IDatabaseDriver>;