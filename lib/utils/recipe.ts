import { IngredientType } from '@/lib/supabase/recipes';

/**
 * Parses a string of ingredients into an array of IngredientType objects.
 * Each line is treated as a separate ingredient.
 *
 * @param text - The input text containing ingredients, one per line
 * @returns An array of IngredientType objects
 */
export function parseIngredients(text: string): IngredientType[] {
  if (!text.trim()) return [];

  return text
    .split('\n')
    .map((line, index) => {
      const trimmed = line.trim();
      if (!trimmed) return null;

      // Try to extract amount and unit from the beginning of the string
      const match = trimmed.match(
        /^(\d+\/\d+|\d+\.?\d*)\s*([a-zA-Z\.]+)?\s*(.*)/
      );

      if (match) {
        const [_, amountStr, unit, name] = match;
        const amount = amountStr.includes('/')
          ? eval(amountStr) // For fractions like 1/2
          : parseFloat(amountStr) || 0;

        return {
          name: name.trim() || 'Unnamed Ingredient',
          amount,
          unit: unit?.trim() || '',
          order: index,
        };
      }

      // If no amount/unit found, treat the whole line as the name
      return {
        name: trimmed,
        amount: 0,
        unit: '',
        order: index,
      };
    })
    .filter((ingredient): ingredient is IngredientType => ingredient !== null);
}

/**
 * Converts an array of IngredientType objects to a formatted string.
 *
 * @param ingredients - Array of ingredients to format
 * @returns A string with each ingredient on a new line
 */
export function formatIngredients(ingredients: IngredientType[]): string {
  return ingredients
    .map((ingredient) => {
      const parts = [];

      // Add amount if it's greater than 0
      if (ingredient.amount > 0) {
        parts.push(ingredient.amount);
      }

      // Add unit if it exists
      if (ingredient.unit) {
        parts.push(ingredient.unit);
      }

      // Add the ingredient name
      parts.push(ingredient.name);

      return parts.join(' ').trim();
    })
    .join('\n');
}

/**
 * Parses a string of instructions into an array of instruction steps.
 * Each line is treated as a separate step.
 *
 * @param text - The input text containing instructions, one per line
 * @returns An array of instruction strings
 */
export function parseInstructions(text: string): string[] {
  return text
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);
}

/**
 * Converts an array of instruction steps to a formatted string.
 *
 * @param instructions - Array of instruction steps
 * @returns A string with each instruction on a new line
 */
export function formatInstructions(instructions: string[]): string {
  return instructions.join('\n\n');
}
