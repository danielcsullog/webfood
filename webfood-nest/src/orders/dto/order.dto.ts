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
    restaurants?: RestaurantDto[];

    constructor(order?: Order) {
        if (order) {
            this.orderId = order.orderId;  
            this.orderDate = order.orderDate;
            this.userId = order.userId;
            this.userAddress = order.userAddress;
            this.orderStatus = order.orderStatus;

            if(order.meals?.isInitialized(true)) {
                this.meals = order.meals
                    .getItems()
                    .map((meal) => new MealDto(meal));
            }

            if(order.restaurants?.isInitialized(true)) {
                this.restaurants = order.restaurants
                    .getItems()
                    .map((restaurant) => new RestaurantDto(restaurant));
            }
        }
    }
    //MEAL, RESTAURANT Get &post works, order post not working FOREIGN KEY constraint fail
}