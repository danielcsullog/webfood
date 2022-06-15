import { RestaurantDto } from "../../restaurants/dto/restaurant.dto";
import { User, UserRole } from "../entity/user";

export class UserDto {
    id?: number;
    name?: string;
    role?: UserRole;
    //restaurants?: RestaurantDto[];
    //workplaces?: RestaurantDto[];

    constructor(user?: User) {
        if(user) {
            this.id = user.id;
            this.name = user.name;
            this.role = user.role;

            //if (user.restaurants.isInitialized(true)) {
            //    this.restaurants = user.restaurants
            //        .getItems()
            //        .map((restaurant) => new RestaurantDto(restaurant));
            //}
//
            //if (user.workplaces.isInitialized(true)) {
            //    this.workplaces = user.workplaces
            //        .getItems()
            //        .map((restaurant) => new RestaurantDto(restaurant));
            //}
        }
    }
}