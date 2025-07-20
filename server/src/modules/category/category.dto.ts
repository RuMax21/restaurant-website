export interface CategoryCreateDto {
    name: string;
    description: string | null;
}

export interface CategoryUpdateDto {
    name: string;
    description: string | null;
}

export interface CategoryDto {
    id: number;
    name: string;
    description: string | null;
}
