import { User } from "../entities/user";
import { UserAddress } from "../entities/user.address";
import { UserDto } from "./user.dto";

export class UserAddressDto {
    id?: number;
    user?: UserDto;
    zipCode?: number;
    city?: string;
    street?: string;
    houseNumber?: number;
    staircase?: number;
    doorbell?: number;
    floor?: number;
    doorNumber?: number;
    note?: string;

    constructor(userAddress?: UserAddress) {
        if (userAddress) {
            this.id = userAddress.id;

            if (userAddress.user && userAddress.user instanceof User) {
                this.user = {
                    id: userAddress.user.id,
                    name: userAddress.user.name,
                    role: userAddress.user.role
                };
            }

            this.zipCode = userAddress.zipCode;
            this.city = userAddress.city;
            this.street = userAddress.street;
            this.houseNumber = userAddress.houseNumber;
            this.staircase = userAddress.staircase;
            this.doorbell = userAddress.doorbell;
            this.floor = userAddress.floor;
            this.doorNumber = userAddress.doorNumber;
            this.note = userAddress.note;
        }
    }
}