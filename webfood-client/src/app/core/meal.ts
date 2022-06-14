export interface Meal {
    id: number;
    name: string;
    price: number;
    description: string;
    category: string;
    isVegan: boolean;
    isSpicy: boolean;
    isVegetarian: boolean;
    isLactoseFree: boolean;
    isGlutenFree: boolean;
    isSugarFree: boolean;
}