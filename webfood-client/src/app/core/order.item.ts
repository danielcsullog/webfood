import { Meal } from "./meal";

export interface OrderItem {
    id: number,
    orderId: number,
    meal: Meal,
    amount: number
}