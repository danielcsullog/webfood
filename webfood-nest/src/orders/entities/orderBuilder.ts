import { Order } from "./order";

export class OrderBuilder {
    orderDate!: string;
    userId!: number;
    userAddress!: string;
    orderedItemIds!: number[];
    isCompleted!: boolean;

    order(): OrderBuilder {
        return new OrderBuilder;
    }

    withDate(date: string): OrderBuilder {
        this.orderDate = date;
        return this;
    }

    withUserId(userId: number): OrderBuilder {
        this.userId = userId;
        return this;
    }

    withUserAddress(address: string): OrderBuilder {
        this.userAddress = address;
        return this;
    }

    withOrderedItemIds(itemIds: number[]): OrderBuilder {
        this.orderedItemIds = itemIds;
        return this;
    }

    withCompletionStatus(isCompleted: boolean): OrderBuilder {
        this.isCompleted = isCompleted;
        return this;
    }

    build(): Order {
        return new Order(this);
    }
}