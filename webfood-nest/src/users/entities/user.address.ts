import { Collection, Entity, ManyToOne, OneToMany, PrimaryKey, Property } from "@mikro-orm/core";
import { Order } from "../../orders/entities/order";
import { User } from "./user";

@Entity()
export class UserAddress {

    @PrimaryKey()
    id!: number;

    @ManyToOne(() => User)
    user!: User;

    @OneToMany(() => Order, (order) => order.userAddress)
    orders = new Collection<Order>(this);

    @Property()
    zipCode!: number;

    @Property()
    city!: string;

    @Property()
    street!: string;

    @Property()
    houseNumber!: number;

    @Property()
    staircase?: number;

    @Property()
    doorbell?: number;

    @Property()
    floor?: number;

    @Property()
    doorNumber?: number;

    @Property()
    note?: string;
}