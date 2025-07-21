import { PrismaClient } from '@prisma/client';
import {
    CategoryCreateDto,
    CategoryUpdateDto,
    CategoryDto,
} from './category.dto';
import { throwIfExist, throwIfNotFound } from '../../utils/db.utils';

export class CategoryService {
    private categories = new PrismaClient().categories;

    public async getAllCategories(
        limit: number = 20,
        offset: number = 0,
    ): Promise<CategoryDto[]> {
        return (await this.categories.findMany({
            skip: offset,
            take: limit,
        })) as CategoryDto[];
    }

    public async createCategory(
        data: CategoryCreateDto,
    ): Promise<CategoryCreateDto> {
        await throwIfExist(
            this.categories.findUnique({ where: { name: data.name } }),
            `This category ${data.name} already exists`,
        );

        return (await this.categories.create({ data })) as CategoryDto;
    }

    public async updateCategory(
        id: number,
        data: CategoryUpdateDto,
    ): Promise<CategoryUpdateDto> {
        await throwIfNotFound(
            this.categories.findUnique({
                where: { id },
            }),
            `This category with id ${id} doesn't exist`,
        );

        return (await this.categories.update({
            where: { id },
            data,
        })) as CategoryUpdateDto;
    }

    public async deleteCategory(id: number): Promise<CategoryDto> {
        await throwIfNotFound(
            this.categories.findUnique({
                where: { id },
            }),
            `The category with ID "${id}" does not exist`,
        );

        return (await this.categories.delete({ where: { id } })) as CategoryDto;
    }
}
