import { Restaurant } from "src/restaurants/entities/restaurant";
import { UserDto } from "src/users/dto/user.dto";
import { User } from "src/users/entity/user";
import { UserAddress } from "src/users/entity/user.address";
import { Order, OrderStatus } from "../entities/order";
import { OrderItemDto } from "./order.item.dto";

export class OrderDto {
    orderId?: number;
    orderDate?: Date;
    user?: UserDto;
    userAddressId: number;
    orderStatus?: OrderStatus;
    orderItems?: OrderItemDto[];
    restaurant?: Restaurant;

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
            
            this.userAddressId = order.userAddress.id;
            this.orderStatus = order.orderStatus;
            this.restaurant = order.restaurant;

            if (order.orderItems.isInitialized(true)) {
                this.orderItems = order.orderItems
                    .getItems()
                    .map((item) => new OrderItemDto(item));
            }

            
        }
    }
}