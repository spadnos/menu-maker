'use server';

import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export type ImportedIngredient = {
  name: string;
  amount: number;
  unit: string;
};

export type ImportedRecipeData = {
  name: string;
  description: string;
  ingredients: ImportedIngredient[];
  instructions: string[];
  prep_time_mins: number;
  cook_time_mins: number;
  servings: number;
};

export async function importRecipeFromUrl(
  url: string
): Promise<{ success: boolean; data?: ImportedRecipeData; error?: string }> {
  try {
    // Validate URL
    try {
      new URL(url);
    } catch {
      return {
        success: false,
        error: 'Invalid URL format',
      };
    }

    // Fetch the webpage content
    const response = await fetch(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (compatible; RecipeImporter/1.0; +https://menumaker.app)',
      },
    });

    if (!response.ok) {
      return {
        success: false,
        error: `Failed to fetch URL: ${response.statusText}`,
      };
    }

    const html = await response.text();

    // Use Claude to extract recipe data
    const message = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 2048,
      messages: [
        {
          role: 'user',
          content: `Extract the recipe information from this webpage HTML and return it as a JSON object with the following structure:
{
  "name": "Recipe name",
  "description": "Brief description (1-2 sentences)",
  "ingredients": [
    {
      "name": "ingredient name (e.g., all-purpose flour)",
      "amount": number (e.g., 2),
      "unit": "unit of measurement (e.g., cups, tablespoons, teaspoons, grams, ounces, whole, pinch, etc.)"
    },
    ...
  ],
  "instructions": ["step 1", "step 2", ...],
  "prep_time_mins": number (estimated prep time in minutes),
  "cook_time_mins": number (estimated cook time in minutes),
  "servings": number (number of servings)
}

Important notes for ingredients:
- Parse each ingredient into name, amount, and unit separately
- For whole items (e.g., "3 eggs"), use "whole" as the unit
- For items without specific amounts (e.g., "salt to taste"), use amount: 1 and unit: "to taste" or "pinch"
- Convert fractions to decimals (e.g., "1/2 cup" becomes amount: 0.5, unit: "cup")
- Standardize units (e.g., use "tablespoon" not "tbsp", "teaspoon" not "tsp", "cup" not "c")

Important notes for instructions:
- Extract the instructions from the URL. Do not try to modify them.

If any field cannot be determined, use reasonable defaults:
- prep_time_mins: 15
- cook_time_mins: 30
- servings: 4

Return ONLY the JSON object, no additional text.

HTML:
${html.substring(0, 100000)}`,
        },
      ],
    });

    // Parse the response
    const content = message.content[0];
    if (content.type !== 'text') {
      return {
        success: false,
        error: 'Unexpected response type from AI',
      };
    }

    // Extract JSON from the response
    let jsonText = content.text.trim();

    // Remove markdown code blocks if present
    if (jsonText.startsWith('```json')) {
      jsonText = jsonText.replace(/```json\n?/, '').replace(/\n?```$/, '');
    } else if (jsonText.startsWith('```')) {
      jsonText = jsonText.replace(/```\n?/, '').replace(/\n?```$/, '');
    }

    const recipeData = JSON.parse(jsonText) as ImportedRecipeData;

    // Validate the extracted data
    if (
      !recipeData.name ||
      !Array.isArray(recipeData.ingredients) ||
      !Array.isArray(recipeData.instructions)
    ) {
      return {
        success: false,
        error: 'Failed to extract valid recipe data from the URL',
      };
    }

    return {
      success: true,
      data: recipeData,
    };
  } catch (error) {
    console.error('Error importing recipe:', error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : 'An unknown error occurred while importing the recipe',
    };
  }
}
