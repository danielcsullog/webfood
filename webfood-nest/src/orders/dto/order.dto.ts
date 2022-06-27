import { RestaurantDto } from "../../restaurants/dto/restaurant.dto";
import { UserDto } from "../../users/dto/user.dto";
import { User } from "../../users/entity/user";
import { Order, OrderStatus } from "../entities/order";
import { OrderItemDto } from "./order.item.dto";
import { UserAddressDto } from "../../users/dto/user.address.dto";

export class OrderDto {
    orderId?: number;
    orderDate?: Date;
    user?: UserDto;
    userAddress?: UserAddressDto;
    shortAddress?: string;
    orderStatus?: OrderStatus;
    orderItems?: OrderItemDto[];
    restaurant?: RestaurantDto;
    comment?: string;

    constructor(order?: Order) {
        if (order) {
            this.orderId = order.orderId;
            this.orderDate = order.orderDate;
            
            if (order.user && order.user instanceof User) {
                this.user = {
                    id: order.user.id,
                    name: order.user.name,
                    role: order.user.role
                };
            }
           
            this.userAddress = new UserAddressDto(order.userAddress);  
            this.shortAddress = order.shortAddress;
            this.orderStatus = order.orderStatus;
            this.restaurant = new RestaurantDto(order.restaurant);

            if (order.orderItems.isInitialized(true)) {
                this.orderItems = order.orderItems
                    .getItems()
                    .map((item) => new OrderItemDto(item));
            }

            this.comment = order.comment;
        }
    }
}