import { body, param } from "express-validator";
import { handleValidation } from "../../utils/validation.utils";

class TableValidator {
    static validateTableId() {
        return [
            param("id")
                .isInt({ min: 1 })
                .withMessage("Table ID is required"),
            handleValidation
        ];
    }

    static validateCreateTable() {
        return [
            body("number")
                .isString()
                .trim()
                .notEmpty()
                .withMessage("Table number is required"),
            body("capacity")
                .isInt({ min: 1 })
                .withMessage("Capacity must be greater than 0"),
            body("location")
                .optional()
                .isString()
                .trim(),
            body("isAvailable")
                .optional()
                .isBoolean()
                .withMessage("Availablity must be a boolean value"),
            handleValidation
        ];
    }

    static validateUpdateTable() {
        return [
            ...this.validateCreateTable(),
            body("number")
                .optional()
                .isString()
                .trim()
                .notEmpty()
                .withMessage("Table number is required"),
            body("capacity")
                .optional()
                .isInt({ min: 1 })
                .withMessage("Capacity must be greater than 0"),
            body("location")
                .optional()
                .isString()
                .trim(),
            body("isAvailable")
                .optional()
                .isBoolean()
                .withMessage("Availablity must be a boolean value"),
        ]
    }
}

export default TableValidator;