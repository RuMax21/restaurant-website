import { body, param } from 'express-validator';
import { handleValidation } from '../../utils/validation.utils';
import { Status } from '@prisma/client';

class ReservationValidator {
    static validateReservationId() {
        return [
            param('id')
                .isInt({ min: 1 })
                .withMessage('Reservation ID is required'),
            handleValidation,
        ];
    }

    static validateCreateReservation() {
        return [
            body('date').isISO8601().withMessage('Valid date is required'),
            body('guestsCount')
                .isInt({ min: 1 })
                .withMessage('Guest count must be greater than 0'),
            body('clientId')
                .isInt({ min: 1 })
                .withMessage('Client ID is required'),
            body('tableId')
                .isInt({ min: 1 })
                .withMessage('Table ID is required'),
            body('notes').optional().isString().trim(),
            body('dishes')
                .isArray({ min: 1 })
                .withMessage('At least one dish is required'),
            body('dishes.*.dishId')
                .isInt({ min: 1 })
                .withMessage('Dish id is required'),
            body('dishes.*.quantity')
                .isInt({ min: 1 })
                .withMessage('Quantity must be greater than 0'),
            body('dishes.*.specialRequest').optional().trim(),
            handleValidation,
        ];
    }

    static validateUpdateReservation() {
        return [
            ...this.validateReservationId(),
            body('date')
                .optional()
                .isISO8601()
                .withMessage('Valid date is required'),
            body('guestsCount')
                .optional()
                .isInt({ min: 1 })
                .withMessage('Guest count must be greater than 0'),
            body('status')
                .optional()
                .isIn(Object.values(Status))
                .withMessage('Invalid status'),
            body('tableId')
                .optional()
                .isInt({ min: 1 })
                .withMessage('Table ID is required'),
            body('notes').optional().isString().trim(),
            body('dishes')
                .optional()
                .isArray({ min: 1 })
                .withMessage('At least one dish is required'),
            body('dishes.*.dishId')
                .optional()
                .isInt({ min: 1 })
                .withMessage('Dish id is required'),
            body('dishes.*.quantity')
                .optional()
                .isInt({ min: 1 })
                .withMessage('Quantity must be greater than 0'),
            body('dishes.*.specialRequest').optional().trim(),
            handleValidation,
        ];
    }
}

export default ReservationValidator;
