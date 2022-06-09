import { Restaurant } from "src/restaurants/entities/restaurant";
import { MealDto } from "../../meals/dto/meal.dto";
import { RestaurantDto } from "../../restaurants/dto/restaurant.dto";
import { Order, OrderStatus } from "../entities/order";
import { OrderItemDto } from "./order.item.dto";

export class OrderDto {
    orderId?: number;
    orderDate?: Date;
    userId?: number;
    userAddress?: string;
    orderStatus?: OrderStatus;
    orderItems?: OrderItemDto[];
    restaurant?: Restaurant;

    constructor(order?: Order) {
        if (order) {
            this.orderId = order.orderId;  
            this.orderDate = order.orderDate;
            this.userId = order.userId;
            this.userAddress = order.userAddress;
            this.orderStatus = order.orderStatus;
            this.restaurant = order.restaurant;

            if(order.orderItems.isInitialized(true)) {
                this.orderItems = order.orderItems
                    .getItems()
                    .map((item) => new OrderItemDto(item));
            }
        }
    }
}