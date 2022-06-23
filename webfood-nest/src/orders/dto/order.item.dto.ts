import { MealDto } from "../../meals/dto/meal.dto";
import { OrderItem } from "../entities/order.item";

export class OrderItemDto {
    id?: number;
    orderId?: number;
    meal?: MealDto;
    amount?: number;

    constructor(orderItem?: OrderItem) {
        if (orderItem) {
            this.id = orderItem.id;
            this.orderId = orderItem.order.orderId;
            this.meal = new MealDto(orderItem.meal);
            this.amount = orderItem.amount;
        }
    }
}