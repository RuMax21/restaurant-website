import { Router } from 'express';
import DishController from './dish.controller';
import DishValidator from './dish.validator';

const router: Router = Router();

router.get('/', DishController.getAllDishes);
router.get('/:id', DishValidator.validateDishId(), DishController.getDishById);
router.post('/', DishValidator.validateCreateDish(), DishController.createDish);
router.put(
    '/:id',
    DishValidator.validateUpdateDish(),
    DishController.updateDish,
);
router.delete(
    '/:id',
    DishValidator.validateDishId(),
    DishController.deleteDish,
);

export default router;
