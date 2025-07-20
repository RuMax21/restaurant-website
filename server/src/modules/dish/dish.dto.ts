export interface DishCreateDto {
    name: string;
    description: string;
    ingredients?: any;
    price: number;
    categoryId: number;
    imageUrls: string[];
}

export interface DishUpdateDto {
    name?: string;
    description?: string;
    ingredients?: any;
    price?: number;
    categoryId?: number;
    imageUrls?: string[];
}

export interface DishDto {
    id: number;
    name: string;
    description: string;
    ingredients: any | null;
    price: number;
    categoryId: number;
    imageUrls: string[];
    /*createdAt: Date;
    updatedAt: Date;*/
}
