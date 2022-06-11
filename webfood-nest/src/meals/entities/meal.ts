import { Collection, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryKey, Property } from "@mikro-orm/core";
import { Restaurant } from "../../restaurants/entities/restaurant";

@Entity()
export class Meal {

    @PrimaryKey()
    id!: number;

    @Property({ unique: true })
    name!: string;

    @Property()
    price!: number;

    @Property()
    description!: string;

    @Property()
    category!: string;

    @Property()
    isVegan!: boolean;

    @Property()
    isSpicy!: boolean;

    @Property()
    isVegetarian!: boolean;

    @Property()
    isLactoseFree!: boolean;

    @Property()
    isGlutenFree!: boolean;

    @Property()
    isSugarFree!: boolean;

    @ManyToMany(() => Restaurant)
    restaurants = new Collection<Restaurant>(this);
}
