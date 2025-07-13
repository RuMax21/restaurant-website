import { Request, Response, NextFunction } from "express";
import { ApiError, ErrorResponse } from "../exception/api-errors.exception";

export function errorMiddleware(
    error: Error | ApiError,
    req: Request,
    res: Response,
    next: NextFunction
): void {

    let response: ErrorResponse;
    let status: number;

    if (error instanceof ApiError) {
        response = error.toResponse();
        status = error.status;
    } else {
        status = 500;
        response = {
            message: "Unexpected error",
            errors: [],
            status,
            timestamp: new Date().toISOString()
        };
    }

    res.status(status).json(response);
}