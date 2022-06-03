import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

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

    withOrderDate(orderDate: string): Order {
        this.orderDate = orderDate;
        return this;
    }

    withUserId(userId: number): Order {
        this.userId = userId;
        return this;
    }

    withUserAddress(address: string): Order {
        this.userAddress = address;
        return this;
    }

    withOrderedItemIds(itemIds: number[]): Order {
        this.orderedItemIds = itemIds;
        return this;
    }

    withCompletionStatus(isCompleted: boolean): Order {
        this.isCompleted = isCompleted;
        return this;
    }
}