'use server';

import axios from 'axios';
import * as cheerio from 'cheerio';
import { URL } from 'url';
import type { IngredientCreateType } from '@/types/database.types';
import type { RecipeCreateType } from '@/types/database.types';

interface ParseRecipeResponse {
  success: boolean;
  data: RecipeCreateType | null;
  error?: string;
}

/**
 * Parses a recipe from a given URL
 * @param {string} url - The URL of the recipe to parse
 * @returns {Promise<Object>} A promise that resolves to the parsed recipe
 */
export async function parseRecipe(url: string): Promise<ParseRecipeResponse> {
  try {
    // Validate URL
    new URL(url); // Will throw if invalid

    // Fetch the webpage
    const { data: html } = await axios.get(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      },
    });
    // console.log(html);

    const $ = cheerio.load(html);

    // Try to find recipe in Schema.org/Recipe format (most reliable)
    const scriptTags = $('script[type="application/ld+json"]').toArray();

    // Helper function to recursively find Recipe object
    const findRecipe = (
      obj: Record<string, unknown> | unknown
    ): Record<string, unknown> | null => {
      if (!obj || typeof obj !== 'object') return null;

      // Check if current object is a Recipe
      if (
        '@type' in obj &&
        (obj['@type'] === 'Recipe' ||
          (Array.isArray(obj['@type']) && obj['@type'].includes('Recipe')))
      ) {
        return obj as Record<string, unknown>;
      }

      // Search in arrays
      if (Array.isArray(obj)) {
        for (const item of obj) {
          if (item && typeof item === 'object') {
            const found = findRecipe(item as Record<string, unknown>);
            if (found) return found;
          }
        }
      } else {
        // Search in object properties
        for (const key in obj) {
          const value = obj[key as keyof typeof obj];
          if (value && typeof value === 'object') {
            const found = findRecipe(value as Record<string, unknown>);
            if (found) return found;
          }
        }
      }

      return null;
    };

    for (const script of scriptTags) {
      try {
        const json = JSON.parse($(script).html() || '') as
          | Record<string, unknown>
          | Array<Record<string, unknown>>;
        const recipe = Array.isArray(json)
          ? json.find((item) => findRecipe(item) !== null)
          : findRecipe(json);

        if (recipe && typeof recipe === 'object' && recipe !== null) {
          const recipeObj = recipe as Record<string, unknown>;
          // Format the recipe data
          const formattedRecipe: RecipeCreateType = {
            name:
              (typeof recipeObj.name === 'string'
                ? recipeObj.name
                : $('h1').first().text().trim()) || 'Untitled Recipe',
            description:
              (typeof recipeObj.description === 'string'
                ? recipeObj.description
                : $('p').first().text().trim()) || '',
            ingredients: (() => {
              const ingredients: IngredientCreateType[] = [];
              const items = Array.isArray(recipeObj.recipeIngredient)
                ? recipeObj.recipeIngredient
                : Array.isArray(recipeObj.ingredients)
                  ? recipeObj.ingredients
                  : [];

              for (const item of items) {
                const name =
                  typeof item === 'string' ? item : 'Unnamed ingredient';
                ingredients.push({
                  name,
                  amount: 0, // Default values
                  unit: '',
                  order: ingredients.length,
                });
              }
              return ingredients;
            })(),
            instructions: (() => {
              const instructions: string[] = [];
              const processStep = (step: unknown): string | null => {
                if (typeof step === 'string') return step;
                if (step && typeof step === 'object') {
                  const stepObj = step as Record<string, unknown>;
                  if ('text' in stepObj) return String(stepObj.text);
                  if ('name' in stepObj) return String(stepObj.name);
                  if (
                    '@type' in stepObj &&
                    stepObj['@type'] === 'HowToStep' &&
                    'text' in stepObj
                  ) {
                    return String(stepObj.text);
                  }
                }
                return null;
              };

              if (Array.isArray(recipeObj.recipeInstructions)) {
                for (const step of recipeObj.recipeInstructions) {
                  const processed = processStep(step);
                  if (processed) instructions.push(processed);
                }
              } else if (typeof recipeObj.instructions === 'string') {
                instructions.push(recipeObj.instructions);
              }
              return instructions;
            })(),
            cook_time_mins:
              typeof recipeObj.cookTime === 'number'
                ? recipeObj.cookTime
                : typeof recipeObj.totalTime === 'number'
                  ? recipeObj.totalTime
                  : 0,
            prep_time_mins:
              typeof recipeObj.prepTime === 'number' ? recipeObj.prepTime : 0,
            servings: (() => {
              const yieldValue = recipeObj.recipeYield;
              if (typeof yieldValue === 'number') return yieldValue;
              if (typeof yieldValue === 'string')
                return parseInt(yieldValue, 10) || 0;
              if (Array.isArray(yieldValue) && yieldValue.length > 0) {
                return parseInt(yieldValue[0], 10) || 0;
              }
              return 0;
            })(),
            // image_url: (() => {
            //   const image = recipeObj.image;
            //   if (typeof image === 'string') return image;
            //   if (
            //     typeof image === 'object' &&
            //     image !== null &&
            //     'url' in image
            //   ) {
            //     return String(image.url);
            //   }
            //   return null;
            // })(),
            image_url: null,
            source_url: url,
          };
          return { success: true, data: formattedRecipe };
        }
      } catch {
        // Skip invalid JSON
        continue;
      }
    }

    // Fallback to basic HTML parsing if no structured data found
    const fallbackRecipe: RecipeCreateType = {
      name: $('h1').first().text().trim() || 'Untitled Recipe',
      description: $('p').first().text().trim() || '',
      ingredients: [],
      instructions: [],
      cook_time_mins: 0,
      prep_time_mins: 0,
      servings: 0,
      image_url: null,
      source_url: url,
    };

    // Try to find ingredients (common patterns)
    $('li, p, span').each((_i, el) => {
      const text = $(el).text().trim();
      if (text.match(/\d+(\s+\d+)?\/?\s*\d*\s*[a-zA-Z]+/)) {
        const ingredient: IngredientCreateType = {
          name: text,
          amount: 0, // Default values for required fields
          unit: '',
          order: 0,
        };
        (fallbackRecipe.ingredients as IngredientCreateType[]).push(ingredient);
      }
    });

    // Try to find instructions
    $('ol li, .instructions li, .directions li, [class*="instruction"]').each(
      (_i, el) => {
        fallbackRecipe.instructions.push($(el).text().trim());
      }
    );

    return {
      success: true,
      data: fallbackRecipe,
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';
    console.error('Error parsing recipe:', errorMessage);
    return {
      success: false,
      data: null,
      error: `Failed to parse recipe: ${errorMessage}`,
    };
  }
}
