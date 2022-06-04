import { OrderStatus } from "../entities/order";

export class OrderDto {
    orderId?: number;
    orderDate?: Date;
    userId?: number;
    userAddress?: string;
    orderStatus?: OrderStatus;
}