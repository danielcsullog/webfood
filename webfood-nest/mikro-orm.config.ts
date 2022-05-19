import { Configuration, IDatabaseDriver, Options } from "@mikro-orm/core";
import { Order } from "./src/orders/entities/order";

export default {
    entities: [Order],
    dbName: 'webfood.sqlite3',
    type: 'sqlite',
} as Options<IDatabaseDriver> | Configuration<IDatabaseDriver>;