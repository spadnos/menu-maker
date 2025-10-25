'use server';

import axios from 'axios';
import * as cheerio from 'cheerio';
import { URL } from 'url';
import type { IngredientCreateType, IngredientType } from '@/types/recipes';
import type { RecipeCreateType } from '@/types/recipes';
import { decodeHTML } from 'entities';
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
  let html = '';
  try {
    // Validate URL
    new URL(url); // Will throw if invalid
    console.log('Fetching recipe from:', url);

    // Generate realistic browser headers to avoid bot detection
    const userAgents = [
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:132.0) Gecko/20100101 Firefox/132.0',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.1 Safari/605.1.15',
    ];

    const userAgent = userAgents[Math.floor(Math.random() * userAgents.length)];
    const isChrome = userAgent.includes('Chrome');

    // Build headers that mimic a real browser
    const headers: Record<string, string> = {
      'User-Agent': userAgent,
      Accept:
        'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
      'Accept-Language': 'en-US,en;q=0.9',
      'Accept-Encoding': 'gzip, deflate, br',
      Connection: 'keep-alive',
      'Upgrade-Insecure-Requests': '1',
      'Sec-Fetch-Dest': 'document',
      'Sec-Fetch-Mode': 'navigate',
      'Sec-Fetch-Site': 'none',
      'Sec-Fetch-User': '?1',
      'Cache-Control': 'max-age=0',
      DNT: '1',
    };

    // Add Chrome-specific headers if using Chrome UA
    if (isChrome) {
      headers['sec-ch-ua'] =
        '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"';
      headers['sec-ch-ua-mobile'] = '?0';
      headers['sec-ch-ua-platform'] = userAgent.includes('Windows')
        ? '"Windows"'
        : '"macOS"';
    }

    // Add a random referer occasionally to appear more natural
    if (Math.random() > 0.7) {
      const urlObj = new URL(url);
      headers['Referer'] = `${urlObj.protocol}//${urlObj.host}`;
    }

    // Implement retry logic with exponential backoff
    let lastError: Error | null = null;
    const maxRetries = 3;

    for (let attempt = 0; attempt < maxRetries; attempt++) {
      try {
        // Add a small random delay before each request (except first)
        if (attempt > 0) {
          const delay = Math.random() * 1000 + 500 * Math.pow(2, attempt - 1); // 0.5s, 1s, 2s base with randomization
          await new Promise((resolve) => setTimeout(resolve, delay));
          console.log(
            `Retry attempt ${attempt + 1} after ${Math.round(delay)}ms delay`
          );
        }

        const response = await axios.get(url, {
          headers,
          timeout: 15000, // 15 second timeout
          maxRedirects: 5,
          validateStatus: (status) => status < 500, // Don't throw on 4xx errors
        });

        // Check for successful response
        if (response.status === 200) {
          html = response.data;
          console.log('Successfully fetched recipe');
          break;
        } else if (response.status === 403 || response.status === 429) {
          throw new Error(
            `Access denied (${response.status}). The website may be blocking automated requests.`
          );
        } else if (response.status >= 400) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
      } catch (error) {
        lastError =
          error instanceof Error ? error : new Error('Unknown error occurred');

        // Don't retry on certain errors
        if (
          axios.isAxiosError(error) &&
          (error.code === 'ENOTFOUND' || error.code === 'ERR_INVALID_URL')
        ) {
          break; // No point retrying DNS or URL errors
        }

        if (attempt === maxRetries - 1) {
          // Last attempt failed
          break;
        }
      }
    }

    // If we still don't have HTML after retries, throw the last error
    if (!html && lastError) {
      throw lastError;
    }
  } catch (error) {
    console.error('Error fetching recipe:', error);
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error occurred';
    return {
      success: false,
      data: null,
      error: `Failed to fetch recipe: ${errorMessage}. The website might be blocking automated requests or is temporarily unavailable.`,
    };
  }

  try {
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
              decodeHTML(
                typeof recipeObj.name === 'string'
                  ? recipeObj.name
                  : $('h1').first().text().trim()
              ) || 'Untitled Recipe',
            description:
              decodeHTML(
                typeof recipeObj.description === 'string'
                  ? recipeObj.description
                  : $('p').first().text().trim()
              ) || '',
            ingredients: (() => {
              const ingredients: IngredientType[] = [];
              const items = Array.isArray(recipeObj.recipeIngredient)
                ? recipeObj.recipeIngredient
                : Array.isArray(recipeObj.ingredients)
                  ? recipeObj.ingredients
                  : [];

              for (const item of items) {
                const name =
                  typeof item === 'string' ? item : 'Unnamed ingredient';
                ingredients.push({
                  name: decodeHTML(name),
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
                  if ('text' in stepObj)
                    return decodeHTML(String(stepObj.text));
                  if ('name' in stepObj)
                    return decodeHTML(String(stepObj.name));
                  if (
                    '@type' in stepObj &&
                    stepObj['@type'] === 'HowToStep' &&
                    'text' in stepObj
                  ) {
                    return decodeHTML(String(stepObj.text));
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
              return instructions.map((instruction) => decodeHTML(instruction));
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
