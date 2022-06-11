import { Collection, Entity, Enum, OneToMany, PrimaryKey, Property } from "@mikro-orm/core";
import { Order } from "../../orders/entities/order";
import { UserAddress } from "./user.address";

@Entity()
export class User {
    @PrimaryKey()
    id!: number;

    @Property()
    name!: string;

    @Property({ unique: true })
    userName!: string;

    @Property()
    password!: string;

    @Enum()
    role!: UserRole;

    @OneToMany(() => Order, (order) => order.user)
    orders = new Collection<Order>(this);

    @OneToMany(() => UserAddress, (address) => address.user)
    addresses = new Collection<UserAddress>(this);
}

export enum UserRole {
    Admin = 'ADMIN',
    RestaurantAdmin = 'RESTAURANT_ADMIN',
    RestaurantWorker = 'RESTAURANT_WORKER',
    User = 'USER',
}