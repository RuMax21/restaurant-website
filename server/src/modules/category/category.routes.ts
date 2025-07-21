import { Router } from 'express';
import CategoriesController from './category.controller';
import CategoryValidator from './category.validator';
import {authAdminMiddleware} from "../../middlewares/auth.middleware";

const router: Router = Router();

router.get('/', CategoriesController.getAllCategories);
router.post(
    '/',
    authAdminMiddleware,
    CategoryValidator.validateCreateCategory(),
    CategoriesController.createCategory,
);
router.put(
    '/:id',
    authAdminMiddleware,
    CategoryValidator.validateUpdateCategory(),
    CategoriesController.updateCategory,
);
router.delete(
    '/:id',
    authAdminMiddleware,
    CategoryValidator.validateCategoryId(),
    CategoriesController.deleteCategory,
);

export default router;
