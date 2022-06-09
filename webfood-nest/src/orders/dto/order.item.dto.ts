import { OrderItem } from "../entities/order.item";

export class OrderItemDto {
    id?: number;
    orderId?: number;
    mealId?: number;
    amount?: number;

    constructor(orderItem?: OrderItem) {
        if (orderItem) {
            this.id = orderItem.id;
            this.orderId = orderItem.order.orderId;
            this.mealId = orderItem.meal.id;
            this.amount = orderItem.amount;
        }
    }
}