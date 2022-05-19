export class OrderDto {
    orderId?: number;
    orderDate?: string;
    userId?: number;
    userAddress?: string;
    orderedItemIds?: number[];
    isCompleted?: boolean;
}