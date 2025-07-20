import { body, param } from 'express-validator';
import { handleValidation } from '../../utils/validation.utils';

class DishValidator {
    static validateDishId() {
        return [
            param('id').isInt({ min: 1 }).withMessage('DishID is required'),
            handleValidation,
        ];
    }

    static validateCreateDish() {
        return [
            body('name')
                .trim()
                .notEmpty()
                .isLength({ min: 3, max: 150 })
                .withMessage('Dish name must be 3-150 characters long'),
            body('description')
                .trim()
                .notEmpty()
                .isLength({ min: 20, max: 500 })
                .withMessage('Dish description must be 20-500 characters long'),
            body('ingredients')
                .optional()
                .isObject()
                .withMessage('Ingredients must be a valid json object'),
            body('price')
                .isFloat({ min: 1.0 })
                .withMessage('Price must be a positive number'),
            body('imageUrls')
                .optional()
                .isArray({ min: 1 })
                .withMessage('At least one image url is required'),
            handleValidation,
        ];
    }

    static validateUpdateDish() {
        return [
            ...this.validateDishId(),
            body('name')
                .optional()
                .trim()
                .isLength({ min: 3, max: 150 })
                .withMessage('Dish name must be 3-150 characters long'),
            body('description')
                .optional()
                .trim()
                .isLength({ min: 20, max: 500 })
                .withMessage('Dish description must be 20-500 characters long'),
            body('ingredients')
                .optional()
                .isObject()
                .withMessage('Ingredients must be a valid json object'),
            body('price')
                .optional()
                .isFloat({ min: 1.0 })
                .withMessage('Price must be a positive number'),
            body('imageUrls')
                .optional()
                .isArray({ min: 1 })
                .withMessage('At least one image url is required'),
            handleValidation,
        ];
    }
}

export default DishValidator;
