import { body, param } from 'express-validator';
import { handleValidation } from '../../utils/validation.utils';

class CategoryValidator {
    static validateCategoryId() {
        return [
            param('id')
                .isInt({ min: 1 })
                .withMessage('Category ID is required'),
            handleValidation,
        ];
    }

    static validateCreateCategory() {
        return [
            body('name')
                .trim()
                .notEmpty()
                .isLength({ min: 3, max: 25 })
                .withMessage('Category name must be 3-25 characters long'),
            body('description')
                .optional()
                .trim()
                .isLength({ min: 20, max: 200 })
                .withMessage(
                    'Category description must be 20-200 characters long',
                ),
            handleValidation,
        ];
    }

    static validateUpdateCategory() {
        return [
            ...this.validateCategoryId(),
            body('name')
                .optional()
                .isLength({ min: 3, max: 25 })
                .withMessage('Category name must be 3-25 characters long'),
            body('description')
                .optional()
                .isLength({ min: 20, max: 200 })
                .withMessage(
                    'Category description must be 20-200 characters long',
                ),
            handleValidation,
        ];
    }
}

export default CategoryValidator;
