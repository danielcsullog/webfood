import { Restaurant } from "src/restaurants/entities/restaurant";
import { MealDto } from "../../meals/dto/meal.dto";
import { RestaurantDto } from "../../restaurants/dto/restaurant.dto";
import { Order, OrderStatus } from "../entities/order";

export class OrderDto {
    orderId?: number;
    orderDate?: Date;
    userId?: number;
    userAddress?: string;
    orderStatus?: OrderStatus;
    meals?: MealDto[];
    restaurant?: Restaurant;

    constructor(order?: Order) {
        if (order) {
            this.orderId = order.orderId;  
            this.orderDate = order.orderDate;
            this.userId = order.userId;
            this.userAddress = order.userAddress;
            this.orderStatus = order.orderStatus;
            this.restaurant = order.restaurant;

            if(order.meals?.isInitialized(true)) {
                this.meals = order.meals
                    .getItems()
                    .map((meal) => new MealDto(meal));   
            } 
        }
    }
}