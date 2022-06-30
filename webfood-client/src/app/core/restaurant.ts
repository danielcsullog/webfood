import { Order } from "./order";
import { User } from "./user";

export interface Restaurant {
    id: number;
    name: string;
    description: string;
    priceCategory?: number;
    category: string;
    address: string;
    openingHours: string[];
    phoneNumber: string;
    owner?: User,
    workers?: User[]
    orders?: Order[]
    allowed?: boolean;
}