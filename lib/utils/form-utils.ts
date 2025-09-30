import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { z } from 'zod'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export type FieldErrors<T> = {
  [K in keyof T]?: string[]
}

export type ActionState<TInput, TOutput> = {
  fieldErrors?: FieldErrors<TInput>
  error?: string | null
  data?: TOutput
}

export const createSafeAction = <TInput, TOutput>(
  schema: z.ZodSchema<TInput>,
  handler: (validatedData: TInput) => Promise<ActionState<TInput, TOutput>>
) => {
  return async (data: TInput): Promise<ActionState<TInput, TOutput>> => {
    const validationResult = schema.safeParse(data)
    if (!validationResult.success) {
      return {
        fieldErrors: validationResult.error.flatten()
          .fieldErrors as FieldErrors<TInput>,
      }
    }

    return handler(validationResult.data)
  }
}

export const formatErrors = (errors: Record<string, string[] | undefined>) => {
  return Object.entries(errors)
    .map(([key, messages]) => {
      if (!messages) return ''
      return `${key}: ${messages.join(', ')}`
    })
    .filter(Boolean)
    .join('\n')
}
