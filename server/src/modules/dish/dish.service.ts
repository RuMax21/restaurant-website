import { PrismaClient } from '@prisma/client';
import { DishDto, DishCreateDto, DishUpdateDto } from './dish.dto';
import { ApiError } from '../../exception/api-errors.exception';

export class DishService {
    private prisma = new PrismaClient();

    public async getAllDishes(): Promise<DishDto[]> {
        return await this.prisma.dishes.findMany();
    }

    public async getDishById(id: number): Promise<DishDto> {
        const dish = await this.prisma.dishes.findUnique({
            where: { id },
        });
        if (!dish) throw ApiError.NotFound(`Dish with id ${id} not found`);

        return dish;
    }

    public async createDish(data: DishCreateDto): Promise<DishDto> {
        const category = await this.prisma.categories.findUnique({
            where: { id: data.categoryId },
        });
        if (!category)
            throw ApiError.NotFound(
                `Category with ID ${data.categoryId} not found`,
            );

        const existingDish: DishDto | null = await this.prisma.dishes.findFirst(
            {
                where: { name: data.name },
            },
        );
        if (existingDish)
            throw ApiError.Conflict(
                `Dish with ID ${existingDish.id} already exists`,
            );

        return await this.prisma.dishes.create({
            data,
        });
    }

    public async updateDish(id: number, data: DishUpdateDto): Promise<DishDto> {
        const dish = await this.prisma.dishes.findUnique({
            where: { id },
        });
        if (!dish) throw ApiError.NotFound(`Dish with ID ${id} not found`);

        if (data.categoryId) {
            const category = await this.prisma.categories.findUnique({
                where: {
                    id: data.categoryId,
                },
            });
            if (!category)
                throw ApiError.NotFound(
                    `Category with ID ${data.categoryId} not found`,
                );
        }

        if (data.name && data.name !== dish.name) {
            const existingDish = await this.prisma.dishes.findFirst({
                where: { name: data.name },
            });
            if (existingDish)
                throw ApiError.Conflict(
                    `Dish with name ${data.name} already exists`,
                );
        }

        let updatedImageUrls: string[] = dish.imageUrls;
        if (data.imageUrls) {
            if (Array.isArray(data.imageUrls)) {
                updatedImageUrls = [
                    ...new Set([...dish.imageUrls, ...data.imageUrls]),
                ];
            } else {
                throw ApiError.BadRequest('Image URL must be an array');
            }
        }

        return await this.prisma.dishes.update({
            where: { id },
            data: {
                ...data,
                imageUrls: updatedImageUrls,
            },
        });
    }

    public async deleteDish(id: number): Promise<DishDto> {
        const dish = await this.prisma.dishes.findUnique({
            where: {
                id,
            },
            include: { ReservationDish: true },
        });
        if (!dish) throw ApiError.NotFound(`Dish with ID ${id} not found`);

        if (dish.ReservationDish.length > 0)
            throw ApiError.Conflict(
                `Can't delete dish as it's used in ${dish.ReservationDish.length} reservations`,
            );

        return await this.prisma.dishes.delete({
            where: { id },
        });
    }
}
