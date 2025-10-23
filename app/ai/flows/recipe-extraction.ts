'use server';

// import { RecipeType } from '@/types/database.types';
import { ai } from '../genkit';
import z from 'zod';
// import { googleAI } from '@genkit-ai/google-genai';

// Extend the ModelOptions interface to include our custom config
declare module '@genkit-ai/ai' {
  interface ModelOptions {
    temperature?: number;
    maxOutputTokens?: number;
  }
}

// Define the input schema for the recipe extraction
// const RecipeExtractionInputSchema = z.object({
//   url: z.string(),
// });
// export type RecipeExtractionInput = z.infer<typeof RecipeExtractionInputSchema>;

const RecipeExtractionOutputSchema = z.object({
  name: z.string().default('Unnamed Recipe'),
  description: z.string().default(''),
  image_url: z.string().optional(),
  ingredients: z
    .array(
      z.object({
        name: z.string(),
        amount: z.number(),
        unit: z.string(),
        order: z.number(),
      })
    )
    .default([]),
  instructions: z.array(z.string()).default([]),
  prep_time_mins: z.number().default(0),
  cook_time_mins: z.number().default(0),
  servings: z.number().default(1),
  source_url: z.string().optional(),
  author: z.string().optional(),
});
export type RecipeExtractionOutput = z.infer<
  typeof RecipeExtractionOutputSchema
>;

// export async function extractRecipe(
//   input: RecipeExtractionInput
// ): Promise<RecipeExtractionOutput> {
//   return recipeExtractionFlow(input);
// }

// const recipeExtractionPrompt = ai.definePrompt({
//   name: 'recipe-extraction',
//   url: {schema: RecipeExtractionInputSchema},
//   output: {schema: RecipeExtractionOutputSchema},
//   prompt: `Extract the recipe from the following URL: ${RecipeExtractionInputSchema.url}

//   Return the recipe in JSON format that matches this TypeScript interface:

//   interface RecipeType {
//     name: string;
//     description: string;
//     image_url: string | null;s
//     ingredients: Array<{
//       name: string;
//       amount: number;
//       unit: string;
//       order: number;
//     }>;
//     instructions: string[];
//     prep_time_mins: number;
//     cook_time_mins: number;
//     servings: number;
//     source_url: string | null;
//   }

//   Make sure to:
//   1. Parse the ingredients into the correct format with name, amount, unit, and order
//   2. Convert all measurements to a consistent unit system
//   3. Extract the cooking instructions as an array of strings
//   4. Convert prep and cook times to minutes
//   5. Include the source URL in the response`,
// });

// const recipeExtractionFlow = ai.defineFlow({
//   name: 'recipe-extraction-flow',
//   inputSchema: RecipeExtractionInputSchema,
//   outputSchema: RecipeExtractionOutputSchema,
// },

//  async (input) => {
//     const {output} = await recipeExtractionPrompt(input);
//     return output!;
//   },
// });

// const recipeExtractionPrompt = ai.definePrompt({
//   name: 'recipeExtractionPrompt',
//   input: { url: RecipeExtractionInputSchema },
//   prompt: `Given the following recipe URL, please extract the recipe details.
//   Keep the list of ingredients and instructions in the same order as they appear in the recipe.

//   Recipe URL: {{{url}}}

//   Make sure to:
//   1. Parse the ingredients into the correct format with name, amount, unit, and order
//   2. Convert all measurements to a consistent unit system
//   3. Extract the cooking instructions as an array of strings
//   4. Convert prep and cook times to minutes
//   5. Include the source URL and author in the response
//   6. Format the output as JSON
//   7. Don't make modifications to the recipe`,
// });
function recipeExtractionPrompt(url: string) {
  return `Analyze the recipe from ${url} and extract all relevant information.
  Keep the list of ingredients and instructions in the same order as they appear in the recipe.

  Make sure to capture:

    - Complete list of ingredients with amounts
    - Detailed step-by-step instructions
    - Cooking times and temperatures
    - Serving size and yield
    - Any special notes or tips

  Include the source URL, author, and date information if they are available. Return the results as a JSON object.`;
}

// const recipeExtractionFlow = ai.defineFlow(
//   {
//     name: 'recipeExtractionFlow',
//     inputSchema: z.object({ url: z.string() }),
//     outputSchema: z.object({ recipe: z.object({}) }),
//   },
//   async ({ url }) => {
//     const { output } = await ai.generate({
//       model: googleAI.model('gemini-2.5-flash'),
//       prompt: `Extract the recipe from the following URL: ${url}`,
//     });
//     return output!;
//   }
// );

// interface GenerateOptions {
//   retry?: {
//     maxAttempts: number;
//     initialDelayMs: number;
//     maxDelayMs: number;
//     backoffFactor: number;
//   };
//   timeout?: number;
// }

async function withRetry<T>(
  fn: () => Promise<T>,
  options: {
    maxAttempts: number;
    initialDelayMs: number;
    maxDelayMs: number;
    backoffFactor: number;
  }
): Promise<T> {
  let lastError: Error | null = null;
  let delay = options.initialDelayMs;

  for (let attempt = 1; attempt <= options.maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;
      if (attempt === options.maxAttempts) break;

      await new Promise((resolve) => setTimeout(resolve, delay));
      delay = Math.min(delay * options.backoffFactor, options.maxDelayMs);
    }
  }
  throw lastError;
}

export async function extractRecipeFromUrl(
  url: string
): Promise<RecipeExtractionOutput> {
  try {
    const response = await withRetry(
      () => ai.generate(recipeExtractionPrompt(url)),
      {
        maxAttempts: 3,
        initialDelayMs: 1000,
        maxDelayMs: 10000,
        backoffFactor: 2,
      }
    );

    if (!response.text) {
      throw new Error('No response text from the model');
    }

    // Try to parse the response as JSON
    let recipeData: Partial<RecipeExtractionOutput>;
    try {
      recipeData = JSON.parse(response.text);
    } catch (parseError) {
      console.error('Failed to parse model response as JSON:', response.text);
      console.error('Parse error:', parseError);
      throw new Error('The model response could not be parsed as valid JSON');
    }

    // Validate the response matches our schema
    const validation = RecipeExtractionOutputSchema.safeParse(recipeData);
    if (!validation.success) {
      console.error('Validation error:', validation.error);
      throw new Error('The model response did not match the expected format');
    }

    return validation.data;
  } catch (error: unknown) {
    console.error('Error in extractRecipeFromUrl:', error);

    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';
    const errorStatus = (error as { status?: number }).status;
    const errorCode = (error as { code?: string }).code;

    // Handle rate limiting or model overload
    if (
      errorMessage.includes('rate limit') ||
      errorMessage.includes('overloaded') ||
      errorStatus === 429
    ) {
      throw new Error(
        'The recipe service is currently overloaded. Please try again in a moment.'
      );
    }

    // Handle timeout
    if (
      error instanceof Error &&
      (error.name === 'TimeoutError' || errorCode === 'ETIMEDOUT')
    ) {
      throw new Error(
        'The recipe service took too long to respond. Please try again.'
      );
    }

    // Generic error message for other cases
    throw new Error(`Failed to extract recipe: ${errorMessage}`);
  }
}
