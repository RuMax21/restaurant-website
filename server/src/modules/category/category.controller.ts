import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from "http-status-codes";
import {CategoryCreateDto, CategoryDto, CategoryUpdateDto} from "./category.dto";
import { CategoryService } from "./category.service";

class CategoriesController {
    private categoryService: CategoryService = new CategoryService();

    public getAllCategories = async (req: Request, res: Response, next: NextFunction): Promise<void> =>  {
        try {
            const categories: CategoryDto[] = await this.categoryService.getAllCategories();

            res.status(StatusCodes.OK).json(categories);
        } catch (error) {
            next(error);
        }
    }

    public createCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const data: CategoryCreateDto = req.body;
            const category: CategoryCreateDto = await this.categoryService.createCategory(data);

            res.status(StatusCodes.CREATED).json(category);
        } catch (error) {
            next(error)
        }
    }

    public updateCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { id } = req.params;
            const data: CategoryUpdateDto = req.body
            const updatedCategory: CategoryUpdateDto = await this.categoryService.updateCategory( Number(id), data );

            res.status(StatusCodes.OK).json(updatedCategory);
        } catch (error) {
            next(error);
        }
    }

    public deleteCategory = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { id } = req.params;
            const deletedCategory: CategoryDto = await this.categoryService.deleteCategory( Number(id) );

            res.status(StatusCodes.OK).json(deletedCategory);
        } catch (error) {
            next(error);
        }
    }
}

export default new CategoriesController();