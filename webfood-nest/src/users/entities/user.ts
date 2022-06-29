import { Collection, Entity, Enum, ManyToMany, OneToMany, PrimaryKey, Property } from "@mikro-orm/core";
import { Restaurant } from "../../restaurants/entities/restaurant";
import { Order } from "../../orders/entities/order";
import { UserAddress } from "./user.address";
import { Request } from "../../requests/entities/request"

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

    @OneToMany(() => Restaurant, (restaurant) => restaurant.owner)
    restaurants = new Collection<Restaurant>(this);

    @ManyToMany(() => Restaurant, (restaurant) => restaurant.workers)
    workplaces = new Collection<Restaurant>(this);

    @OneToMany(() => Request, (request) => request.user)
    requests = new Collection<Request>(this);
}

export enum UserRole {
    Admin = 'ADMIN',
    User = 'USER',
}