import { PrismaClient } from '@prisma/client';
import { DishDto, DishCreateDto, DishUpdateDto } from './dish.dto';
import { ApiError } from '../../exception/api-errors.exception';
import { throwIfNotFound, throwIfExist } from '../../utils/db.utils';

export class DishService {
    private prisma = new PrismaClient();

    public async getAllDishes(
        limit: number = 20,
        offset: number = 0,
    ): Promise<DishDto[]> {
        return (await this.prisma.dishes.findMany({
            skip: offset,
            take: limit,
        })) as DishDto[];
    }

    public async getDishById(id: number): Promise<DishDto> {
        return (await throwIfNotFound(
            this.prisma.dishes.findUnique({ where: { id } }),
            `Dish with id ${id} not found`,
        )) as DishDto;
    }

    public async createDish(data: DishCreateDto): Promise<DishDto> {
        await throwIfNotFound(
            this.prisma.categories.findUnique({
                where: { id: data.categoryId },
            }),
            `Category with ID ${data.categoryId} not found`,
        );

        await throwIfExist(
            this.prisma.dishes.findFirst({
                where: { name: data.name },
            }),
            `Dish with ID ${data.name} already exists`,
        );

        return (await this.prisma.dishes.create({
            data,
        })) as DishDto;
    }

    public async updateDish(id: number, data: DishUpdateDto): Promise<DishDto> {
        const dish = (await throwIfNotFound(
            this.prisma.dishes.findUnique({
                where: { id },
            }),
            `Dish with ID ${id} not found`,
        )) as DishDto;

        if (data.categoryId) {
            await throwIfNotFound(
                this.prisma.dishes.findUnique({
                    where: { id: data.categoryId },
                }),
                `Category with ID ${data.categoryId} not found`,
            );
        }

        if (data.name && data.name !== dish.name) {
            await throwIfExist(
                this.prisma.dishes.findFirst({
                    where: { name: data.name },
                }),
                `Dish with ID ${data.name} already exists`,
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

        return (await this.prisma.dishes.update({
            where: { id },
            data: {
                ...data,
                imageUrls: updatedImageUrls,
            },
        })) as DishDto;
    }

    public async deleteDish(id: number): Promise<DishDto> {
        const dish = (await throwIfNotFound(
            this.prisma.dishes.findUnique({
                where: {
                    id,
                },
                include: { ReservationDish: true },
            }),
            `Dish with ID ${id} not found`,
        )) as DishDto & { ReservationDish: any[] };

        if (dish.ReservationDish.length > 0)
            throw ApiError.Conflict(
                `Can't delete dish as it's used in ${dish.ReservationDish.length} reservations`,
            );

        return (await this.prisma.dishes.delete({
            where: { id },
        })) as DishDto;
    }
}
