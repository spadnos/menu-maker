import { type ClassConstructor, plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';

export async function validateDto<T extends object>(
  dto: T,
  dtoClass: ClassConstructor<T>
): Promise<{ errors: Record<string, string[]> } | null> {
  const instance = plainToInstance(dtoClass, dto);
  const validationErrors = await validate(instance as object);

  if (validationErrors.length === 0) {
    return null;
  }

  const errors: Record<string, string[]> = {};

  validationErrors.forEach((error: ValidationError) => {
    if (error.constraints) {
      errors[error.property] = Object.values(error.constraints);
    }
  });

  return { errors };
}

export class ApiError extends Error {
  statusCode: number;
  errors?: Record<string, string[]>;

  constructor(
    message: string,
    statusCode: number = 400,
    errors?: Record<string, string[]>
  ) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.errors = errors;
  }

  static badRequest(message: string, errors?: Record<string, string[]>) {
    return new ApiError(message, 400, errors);
  }

  static unauthorized(message = 'Unauthorized') {
    return new ApiError(message, 401);
  }

  static forbidden(message = 'Forbidden') {
    return new ApiError(message, 403);
  }

  static notFound(message = 'Not Found') {
    return new ApiError(message, 404);
  }

  static conflict(message = 'Conflict') {
    return new ApiError(message, 409);
  }

  static internal(message = 'Internal Server Error') {
    return new ApiError(message, 500);
  }
}
