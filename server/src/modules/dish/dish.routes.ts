import { Router } from 'express';
import DishController from './dish.controller';
import DishValidator from './dish.validator';
import { authAdminMiddleware } from '../../middlewares/auth.middleware';

const router: Router = Router();

router.get('/', DishController.getAllDishes);
router.get('/:id', DishValidator.validateDishId(), DishController.getDishById);
router.post(
    '/',
    authAdminMiddleware,
    DishValidator.validateCreateDish(),
    DishController.createDish,
);
router.put(
    '/:id',
    authAdminMiddleware,
    DishValidator.validateUpdateDish(),
    DishController.updateDish,
);
router.delete(
    '/:id',
    authAdminMiddleware,
    DishValidator.validateDishId(),
    DishController.deleteDish,
);

export default router;
