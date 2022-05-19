import { Entity, PrimaryKey } from "@mikro-orm/core";
import { OrderBuilder } from "./orderBuilder";

@Entity()
export class Order {
    @PrimaryKey()
    orderId!: number;


    orderDate!: string;
    userId!: number;
    userAddress!: string;
    orderedItemIds!: number[];
    isCompleted!: boolean;
    //voucher?: number;
    // TODO: complete fields if necessary

    constructor(private builder: OrderBuilder) {
        this.orderId = builder.orderId;
        this.orderDate = builder.orderDate
        this.userId = builder.userId;
        this.userAddress = builder.userAddress;
        this.orderedItemIds = builder.orderedItemIds;
        this.isCompleted = builder.isCompleted;
    }
}