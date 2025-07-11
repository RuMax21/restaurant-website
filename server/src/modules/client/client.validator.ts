import { body, param, validationResult } from "express-validator";

class ClientValidator {
    static validateClientId() {
        return [
            param('id')
                .isInt({ min: 1 })
                .withMessage('Incorrect ID')
        ];
    }

    static validateCreateClient() {
        return [
            body("fullName")
                .trim()
                .notEmpty()
                .withMessage('Name is required')
                .isLength({ min: 2, max: 50 })
                .withMessage('Name must be 2-50 characters long'),
            body("phone")
                .trim()
                .notEmpty()
                .withMessage('Phone is required')
                .matches(/^\+?[0-9]{11}$/)
                .withMessage('Invalid phone number'),
            body("email")
                .optional()
                .trim()
                .isEmail()
                .withMessage('Invalid email format')
        ]
    }
}

export default ClientValidator;