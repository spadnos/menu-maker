import { NextResponse } from 'next/server';
import { ApiError } from './api-utils';

type SuccessResponse<T> = {
  success: true;
  data: T;
};

type ErrorResponse = {
  success: false;
  error: {
    message: string;
    code?: string;
    details?: Record<string, unknown>;
  };
};

export type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;

export function createSuccessResponse<T>(data: T): ApiResponse<T> {
  return {
    success: true,
    data,
  };
}

export function createErrorResponse(
  message: string,
  code?: string,
  details?: Record<string, unknown>
): ErrorResponse {
  return {
    success: false,
    error: {
      message,
      ...(code && { code }),
      ...(details && { details }),
    },
  };
}

export function createApiResponse<T>(
  data: T | null,
  error: Error | null = null
): ApiResponse<T> {
  if (error) {
    return createErrorResponse(
      error.message,
      error instanceof ApiError ? error.statusCode.toString() : '500',
      error instanceof ApiError ? error.errors : undefined
    );
  }

  if (data === null) {
    return createErrorResponse('Resource not found', '404');
  }

  return createSuccessResponse(data);
}

export function toNextResponse<T>(response: ApiResponse<T>, status = 200) {
  return NextResponse.json(response, { status });
}

export function handleApiError(error: unknown) {
  console.error('API Error:', error);

  if (error instanceof ApiError) {
    return toNextResponse(
      createErrorResponse(
        error.message,
        error.statusCode.toString(),
        error.errors
      ),
      error.statusCode
    );
  }

  const errorMessage =
    error instanceof Error ? error.message : 'An unknown error occurred';
  return toNextResponse(
    createErrorResponse(
      errorMessage,
      '500',
      error instanceof Error
        ? { name: error.name, stack: error.stack }
        : undefined
    ),
    500
  );
}
