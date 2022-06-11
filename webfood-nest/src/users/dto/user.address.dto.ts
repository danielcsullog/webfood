import { User } from "../entity/user";
import { UserAddress } from "../entity/user.address";

export class UserAddressDto {
    id?: number;
    userId?: number;
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
            if(userAddress) {
                this.id = userAddress.id;
                this.userId = userAddress.user.id;
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