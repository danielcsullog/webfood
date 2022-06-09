import { Entity, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { Meal } from "../../meals/entities/meal";
import { Order } from "./order";

@Entity()
export class OrderItem {

    @PrimaryKey()
    id: number;

    @ManyToOne(() => Order)
    order: Order;

    @ManyToOne(() => Meal)
    meal: Meal;

    @Property({ default: 1 })
    amount!: number;
}