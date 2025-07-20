import { PrismaClient } from '@prisma/client';
import {
    CategoryCreateDto,
    CategoryUpdateDto,
    CategoryDto,
} from './category.dto';
import { ApiError } from '../../exception/api-errors.exception';

export class CategoryService {
    private categories = new PrismaClient().categories;

    public async getAllCategories(): Promise<CategoryDto[]> {
        return await this.categories.findMany();
    }

    public async createCategory(
        data: CategoryCreateDto,
    ): Promise<CategoryCreateDto> {
        const findCategory: CategoryDto | null =
            await this.categories.findUnique({
                where: { name: data.name },
            });

        if (findCategory)
            throw ApiError.Conflict(
                `This category "${data.name}" already exists`,
            );
        return await this.categories.create({ data });
    }

    public async updateCategory(
        id: number,
        data: CategoryUpdateDto,
    ): Promise<CategoryUpdateDto> {
        const findCategory: CategoryDto | null =
            await this.categories.findUnique({
                where: { id },
            });

        if (!findCategory)
            throw ApiError.Conflict(
                `This category "${data.name}" does not exist`,
            );
        return await this.categories.update({
            where: { id },
            data,
        });
    }

    public async deleteCategory(id: number): Promise<CategoryDto> {
        const findCategory: CategoryDto | null =
            await this.categories.findUnique({
                where: { id },
            });

        if (!findCategory)
            throw ApiError.Conflict(
                `The category with ID "${id}" does not exist`,
            );
        return await this.categories.delete({ where: { id } });
    }
}
