import { OrderItem } from "./order.item";
import { Restaurant } from "./restaurant";
import { UserAddress } from "./user.address";

export interface Order {
    orderId?: number;
    orderDate?: Date;
    orderDoneDate?: Date;
    userAddress: UserAddress;
    shortAddress?: string;
    orderStatus?: string;
    restaurantId: number;
    orderItems: OrderItem[];
    comment?: string;
}
