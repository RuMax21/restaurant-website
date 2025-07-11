import { body, param } from "express-validator";
import {handleValidation} from "../../utils/validation.utils";

class ClientValidator {
    static validateClientId() {
        return [
            param('id')
                .isInt({ min: 1 })
                .withMessage('Incorrect ID'),
            handleValidation
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
                .matches(/^(\+7|8)\s?\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}$/)
                .withMessage('Invalid phone number'),
            body("email")
                .optional()
                .trim()
                .isEmail()
                .withMessage('Invalid email format'),
            handleValidation,
        ]
    }
}

export default ClientValidator;