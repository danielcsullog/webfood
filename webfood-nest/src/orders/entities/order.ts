import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { OrderBuilder } from "./orderBuilder";

@Entity()
export class Order {
    @PrimaryKey()
    orderId!: number;

    @Property()
    orderDate!: string;

    @Property()
    userId!: number;

    @Property()
    userAddress!: string;

    @Property()
    orderedItemIds!: number[];

    @Property()    
    isCompleted!: boolean;
    //voucher?: number;
    // TODO: complete fields if necessary

    constructor(private builder: OrderBuilder) {
        this.orderDate = builder.orderDate
        this.userId = builder.userId;
        this.userAddress = builder.userAddress;
        this.orderedItemIds = builder.orderedItemIds;
        this.isCompleted = builder.isCompleted;
    }
}