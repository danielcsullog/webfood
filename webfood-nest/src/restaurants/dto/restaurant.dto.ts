import { User } from "../../users/entities/user";
import { UserDto } from "../../users/dto/user.dto";
import { Restaurant, RestaurantCategory } from "../entities/restaurant";
import { OrderDto } from "../../orders/dto/order.dto";

export class RestaurantDto {
    id?: number;
    name?: string;
    description?: string;
    priceCategory?: number;
    category?: RestaurantCategory;
    address?: string;
    openingHours?: string[];
    phoneNumber?: string;
    owner?: UserDto;
    workers?: UserDto[];
    orders?: OrderDto[];

    constructor(restaurant?: Restaurant) {
        if (restaurant) {
            this.id = restaurant.id;
            this.name = restaurant.name;
            this.description = restaurant.description;
            this.priceCategory = restaurant.priceCategory,
            this.category = restaurant.category;
            this.address = restaurant.address;
            this.openingHours = restaurant.openingHours;
            this.phoneNumber = restaurant.phoneNumber;
            
           if(restaurant.owner && restaurant.owner instanceof User) {
               this.owner = {
                   id: restaurant.owner.id,
                   name: restaurant.owner.name,
                   role: restaurant.owner.role
               };
           }
            
            if(restaurant.workers && restaurant.workers.isInitialized(true)) {
                this.workers = restaurant.workers
                    .getItems()
                    .map((user) => new UserDto(user));
            }

            if(restaurant.orders && restaurant.orders.isInitialized(true)) {
                this.orders = restaurant.orders
                    .getItems()
                    .map(order => new OrderDto(order));
            }
        }
    }
}

