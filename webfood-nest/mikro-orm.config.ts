import { IDatabaseDriver, Options } from "@mikro-orm/core";
import { Meal } from "./src/meals/entities/meal";
import { Restaurant } from "./src/restaurants/entities/restaurant";
import { Order } from "./src/orders/entities/order";
import { OrderItem } from "./src/orders/entities/order.item";

export default {
    entities: [Order, Restaurant, Meal, OrderItem],
    dbName: 'webfood.sqlite3',
    type: 'sqlite',
} as Options<IDatabaseDriver>;