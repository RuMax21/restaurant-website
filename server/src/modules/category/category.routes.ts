import { Router } from "express";
import CategoriesController from './category.controller';
import CategoryValidator from "./category.validator";

const router: Router = Router();

router.get('/', CategoriesController.getAllCategories);
router.post('/', CategoryValidator.validateCreateCategory(), CategoriesController.createCategory);
router.put('/:id', CategoryValidator.validateUpdateCategory(), CategoriesController.updateCategory);
router.delete('/:id', CategoryValidator.validateCategoryId(), CategoriesController.deleteCategory);

export default router;