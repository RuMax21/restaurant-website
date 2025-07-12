export interface CategoryCreateDto {
    name: string;
    description?: string;
}

export interface CategoryUpdateDto {
    name?: string;
    description?: string;
}