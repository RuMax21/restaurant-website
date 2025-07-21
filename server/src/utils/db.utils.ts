import { ApiError } from '../exception/api-errors.exception';

export async function throwIfExist<T>(
    findPromise: Promise<T>,
    error: string,
): Promise<void> {
    const found = await findPromise;
    if (found) throw ApiError.Conflict(error);
}

export async function throwIfNotFound<T>(
    findPromise: Promise<T>,
    error: string,
): Promise<T> {
    const found = await findPromise;
    if (!found) throw ApiError.NotFound(error);
    return found;
}
