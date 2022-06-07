import { Restaurant, RestaurantCategory } from "../entities/restaurant";

export class RestaurantDto {
    id?: number;
    name?: string;
    description?: string;
    priceCategory?: number;
    category?: RestaurantCategory;
    address?: string;
    openingHours?: string[];
    phoneNumber?: string;

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
        }
    }
}

