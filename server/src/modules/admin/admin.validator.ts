import { body } from 'express-validator';
import { handleValidation } from '../../utils/validation.utils';

class AdminValidator {
    static validateRegisterAdmin() {
        return [
            body('email')
                .trim()
                .notEmpty()
                .withMessage('Email is required')
                .isEmail()
                .withMessage('Invalid email format'),
            body('password')
                .trim()
                .notEmpty()
                .withMessage('Password is required')
                .isLength({ min: 8 })
                .withMessage('Password must be at least 8 characters')
                .matches(/[A-Z]/)
                .withMessage(
                    'Password must contain at least 1 uppercase letter',
                )
                .matches(/[a-z]/)
                .withMessage(
                    'Password must contain at least 1 lowercase letter',
                )
                .matches(/[0-9]/)
                .withMessage('Password must contain at least 1 number')
                .matches(/[^A-Za-z0-9]/)
                .withMessage(
                    'Password must contain at least 1 special character',
                ),
            body('fullName')
                .trim()
                .notEmpty()
                .withMessage('Full name is required')
                .isString()
                .isLength({ min: 3 })
                .withMessage('Full name must be at least 3 characters'),
            handleValidation,
        ];
    }

    static validateLoginAdmin() {
        return [
            body('email')
                .trim()
                .notEmpty()
                .withMessage('Email is required')
                .isEmail()
                .withMessage('Invalid email format'),
            body('password')
                .trim()
                .notEmpty()
                .withMessage('Password is required'),
            handleValidation,
        ];
    }
}

export default AdminValidator;
