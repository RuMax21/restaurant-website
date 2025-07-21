import { Request, Response, NextFunction } from 'express';
import { AdminService } from '../modules/admin/admin.service';
import { ApiError } from '../exception/api-errors.exception';
import { JwtPayload } from 'jsonwebtoken';

export function authAdminMiddleware(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    const authHeader: string | undefined = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return next(ApiError.Forbidden('No token provided'));
    }

    const accessToken: string = authHeader.split(' ')[1];
    try {
        const payload: JwtPayload | string =
            AdminService.verifyToken(accessToken);
        (req as any).user = payload; //TODO: change the typing
        next();
    } catch (error) {
        return next(ApiError.Forbidden('Invalid or expired access token'));
    }
}
