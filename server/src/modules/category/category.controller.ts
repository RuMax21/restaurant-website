import { Request, Response } from 'express';
import { StatusCodes } from "http-status-codes";
import { CategoryCreateDto, CategoryUpdateDto } from "./category.dto";
import CategoryService from "./category.service";

class CategoriesController {
    async getAllCategories(req: Request, res: Response) {
        try {
            const categories = await CategoryService.getAllCategories();
            res.status(StatusCodes.OK).json(categories);
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: `Couldn't find categories`,
            });
        }
    }

    async createCategory(req: Request, res: Response) {
        try {
            const data: CategoryCreateDto = req.body;
            const category = await CategoryService.createCategory(data);
            res.status(StatusCodes.CREATED).json(category);
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: `Failed to create category`,
            });
        }
    }

    async updateCategory(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const data: CategoryUpdateDto = req.body
            const updatedCategory = await CategoryService.updateCategory( Number(id), data );

            if (!updatedCategory) {
                return res.status(StatusCodes.NOT_FOUND).json({
                    message: `Category with id ${id} not found`,
                })
            }

            res.status(StatusCodes.OK).json(updatedCategory);
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: `Failed to update category`,
            });
        }
    }

    async deleteCategory(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const deletedCategory = await CategoryService.deleteCategory( Number(id) );

            if (!deletedCategory) {
                return res.status(StatusCodes.NOT_FOUND).json({
                    message: `Category with id ${id} not found`,
                })
            }

            res.status(StatusCodes.OK).json(deletedCategory);
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: `Failed to delete category`,
            });
        }
    }
}

export default new CategoriesController();