import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { DishService } from './dish.service';
import { DishCreateDto, DishDto, DishUpdateDto } from './dish.dto';

class DishController {
    private dishService: DishService = new DishService();

    public getAllDishes = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const dishes: DishDto[] = await this.dishService.getAllDishes();
            res.status(StatusCodes.OK).json(dishes);
        } catch (error) {
            next(error);
        }
    };

    public getDishById = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const { id } = req.params;
            const dish: DishDto = await this.dishService.getDishById(
                Number(id),
            );

            res.status(StatusCodes.OK).json(dish);
        } catch (error) {
            next(error);
        }
    };

    public createDish = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const data: DishCreateDto = req.body;
            const createdDish: DishDto =
                await this.dishService.createDish(data);

            res.status(StatusCodes.CREATED).json(createdDish);
        } catch (error) {
            next(error);
        }
    };

    public updateDish = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const { id } = req.params;
            const data: DishUpdateDto = req.body;
            const updateDish: DishDto = await this.dishService.updateDish(
                Number(id),
                data,
            );

            res.status(StatusCodes.OK).json(updateDish);
        } catch (error) {
            next(error);
        }
    };

    public deleteDish = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const { id } = req.params;
            const deletedDish: DishDto = await this.dishService.deleteDish(
                Number(id),
            );

            res.status(StatusCodes.OK).json(deletedDish);
        } catch (error) {
            next(error);
        }
    };
}

export default new DishController();
