import { Readable } from 'stream';

/**
 * Parse form data from a request
 * @param request The incoming request
 * @returns Parsed form data as FormData
 */
export async function getFormData(request: Request): Promise<FormData> {
  return await request.formData();
}

/**
 * Get a file from form data
 * @param formData The form data
 * @param fieldName The name of the file field
 * @returns The file if it exists, null otherwise
 */
export function getFileFromFormData(
  formData: FormData,
  fieldName: string
): File | null {
  const file = formData.get(fieldName);
  return file instanceof File ? file : null;
}

/**
 * Convert a file to a Buffer
 * @param file The file to convert
 * @returns A promise that resolves to a Buffer
 */
export async function fileToBuffer(file: File): Promise<Buffer> {
  const chunks: Uint8Array[] = [];
  const stream = file.stream() as unknown as Readable;

  for await (const chunk of stream) {
    chunks.push(chunk);
  }

  return Buffer.concat(chunks);
}

/**
 * Get a string value from form data
 * @param formData The form data
 * @param fieldName The name of the field
 * @returns The string value or null if not found
 */
export function getStringFromFormData(
  formData: FormData,
  fieldName: string
): string | null {
  const value = formData.get(fieldName);
  return value ? String(value) : null;
}

/**
 * Get a number value from form data
 * @param formData The form data
 * @param fieldName The name of the field
 * @returns The number value or null if not found or invalid
 */
export function getNumberFromFormData(
  formData: FormData,
  fieldName: string
): number | null {
  const value = formData.get(fieldName);
  if (value === null) return null;

  const num = Number(value);
  return isNaN(num) ? null : num;
}

/**
 * Get a boolean value from form data
 * @param formData The form data
 * @param fieldName The name of the field
 * @returns The boolean value (true if the field exists and is 'true', false otherwise)
 */
export function getBooleanFromFormData(
  formData: FormData,
  fieldName: string
): boolean {
  return formData.get(fieldName) === 'true';
}

/**
 * Get an array of strings from form data
 * @param formData The form data
 * @param fieldName The name of the field
 * @returns An array of strings
 */
export function getStringArrayFromFormData(
  formData: FormData,
  fieldName: string
): string[] {
  return formData.getAll(fieldName).map(String);
}

/**
 * Get a date value from form data
 * @param formData The form data
 * @param fieldName The name of the field
 * @returns The Date object or null if not found or invalid
 */
export function getDateFromFormData(
  formData: FormData,
  fieldName: string
): Date | null {
  const value = formData.get(fieldName);
  if (!value) return null;

  const date = new Date(String(value));
  return isNaN(date.getTime()) ? null : date;
}
