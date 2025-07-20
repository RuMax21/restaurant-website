export interface ErrorDetails {
    field?: string;
    message: string;
    code?: string;
}

export interface ErrorResponse {
    message: string;
    errors: ErrorDetails[];
    status: number;
    timestamp?: string;
}

export class ApiError extends Error {
    public readonly status: number;
    public readonly message: string;
    public readonly errors: ErrorDetails[];
    public readonly timestamp: string;

    constructor(status: number, message: string, errors: ErrorDetails[] = []) {
        super(message);

        this.status = status;
        this.message = message;
        this.errors = errors;
        this.timestamp = new Date().toISOString();
    }

    static BadRequest(message: string, errors: ErrorDetails[] = []): ApiError {
        return new ApiError(400, message, errors);
    }

    static NotFound(resource: string = 'Resource'): ApiError {
        return new ApiError(404, `${resource} not found`);
    }

    static Forbidden(message: string = 'Access denied'): ApiError {
        return new ApiError(403, message);
    }

    static Conflict(message: string = 'Data conflict'): ApiError {
        return new ApiError(409, message);
    }

    static InternalServerError(
        message: string = 'Internal Server Error',
    ): ApiError {
        return new ApiError(500, message);
    }

    toResponse(): ErrorResponse {
        return {
            message: this.message,
            errors: this.errors,
            status: this.status,
            timestamp: this.timestamp,
        };
    }
}
