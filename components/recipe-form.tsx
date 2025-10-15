'use client';

import type React from 'react';

import { useState, useRef, ChangeEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

import { RecipeType } from '@/types/database.types';
import Image from 'next/image';

type NewRecipeProps = {
  name: string;
  description: string;
  ingredients: string;
  instructions: string;
  image_url: string | null;
  prep_time_mins: number;
  cook_time_mins: number;
  servings: number;
};

interface RecipeFormProps {
  onSubmit: (e: React.FormEvent, recipe: NewRecipeProps) => void;
  recipe?: RecipeType;
}

export function RecipeForm({ onSubmit, recipe }: RecipeFormProps) {
  const [updatedRecipe, setUpdatedRecipe] = useState({
    id: recipe?.id || null,
    name: recipe?.name || '',
    description: recipe?.description || '',
    ingredients: recipe?.ingredients.join('\n') || '',
    instructions: recipe?.instructions.join('\n') || '',
    image_url: recipe?.image_url || null,
    prep_time_mins: recipe?.prep_time_mins || 0,
    cook_time_mins: recipe?.cook_time_mins || 0,
    servings: recipe?.servings || 0,
  });
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    recipe?.image_url || null
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check if file is an image
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Image size should be less than 5MB');
      return;
    }

    try {
      setIsUploading(true);

      // In a real app, you would upload the file to a storage service here
      // For now, we'll just create a local URL for preview
      const fileUrl = URL.createObjectURL(file);
      setPreviewUrl(fileUrl);

      // Update the form with the file (in a real app, you'd get the URL from your storage service)
      setUpdatedRecipe((prev) => ({
        ...prev,
        image_url: fileUrl, // In a real app, this would be the URL from your storage service
      }));
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Error uploading image. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const removeImage = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(null);
    setUpdatedRecipe((prev) => ({
      ...prev,
      image_url: null,
    }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleNameChange = (value: string) => {
    setUpdatedRecipe((prev) => ({ ...prev, name: value }));
  };

  const handleDescriptionChange = (value: string) => {
    setUpdatedRecipe((prev) => ({ ...prev, description: value }));
  };

  const handleIngredientsChange = (value: string) => {
    setUpdatedRecipe((prev) => ({
      ...prev,
      ingredients: value,
    }));
  };

  const handleInstructionsChange = (value: string) => {
    setUpdatedRecipe((prev) => ({
      ...prev,
      instructions: value,
    }));
  };

  return (
    <form onSubmit={(e) => onSubmit(e, updatedRecipe)} className="space-y-6">
      {/* Recipe Name */}
      <div className="space-y-2">
        <Label htmlFor="name" className="text-base font-medium">
          Recipe Name
        </Label>
        <Input
          id="name"
          value={updatedRecipe.name}
          onChange={(e) => handleNameChange(e.target.value)}
          placeholder="e.g., Classic Margherita Pizza"
          required
          className="text-base"
        />
      </div>

      {/* Recipe Image Upload */}
      <div className="space-y-2">
        <Label htmlFor="image" className="text-base font-medium">
          Recipe Image
        </Label>
        <div className="flex items-center gap-4">
          {previewUrl ? (
            <div className="relative group">
              <div className="relative w-32 h-32 overflow-hidden rounded-md border border-gray-200 dark:border-gray-700">
                <Image
                  alt={updatedRecipe.name}
                  width={80}
                  height={80}
                  src={previewUrl}
                />
              </div>
              <button
                type="button"
                onClick={removeImage}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                disabled={isUploading}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
          ) : (
            <div className="w-32 h-32 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-md flex items-center justify-center">
              <span className="text-gray-400 text-sm text-center px-2">
                No image selected
              </span>
            </div>
          )}
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
              >
                {isUploading ? 'Uploading...' : 'Choose Image'}
              </Button>
              <input
                ref={fileInputRef}
                id="image"
                name="image"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                disabled={isUploading}
              />
              {isUploading && (
                <span className="text-sm text-muted-foreground">
                  Uploading...
                </span>
              )}
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              JPG, PNG up to 5MB
            </p>
          </div>
        </div>
      </div>

      {/* Recipe Description */}
      <div className="space-y-2">
        <Label htmlFor="description" className="text-base font-medium">
          Description
        </Label>
        <Textarea
          id="description"
          value={updatedRecipe.description}
          onChange={(e) => handleDescriptionChange(e.target.value)}
          placeholder="Describe your recipe..."
          rows={4}
          className="text-base resize-none"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="ingredients" className="text-base font-medium">
          Ingredients
        </Label>
        <p className="text-sm text-muted-foreground">
          Enter one ingredient per line with quantity, unit, and name
        </p>
        <Textarea
          id="ingredients"
          value={updatedRecipe.ingredients}
          onChange={(e) => handleIngredientsChange(e.target.value)}
          placeholder={[
            '2 cups all-purpose flour',
            '1 cup granulated sugar',
            '3 whole eggs',
            '1/2 teaspoon salt',
            '1 tablespoon vanilla extract',
            '...',
          ].join('\n')}
          rows={8}
          required
          className="text-base font-mono"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="instructions" className="text-base font-medium">
          Instructions
        </Label>
        <p className="text-sm text-muted-foreground">
          Enter one instruction per line
        </p>
        <Textarea
          id="instructions"
          value={updatedRecipe.instructions}
          onChange={(e) => handleInstructionsChange(e.target.value)}
          placeholder={[
            'Preheat oven to 350°FM\nMix dry ingredients in a bowl',
            'Add wet ingredients and stir until combined',
            '...',
          ].join('\n')}
          rows={10}
          required
          className="text-base font-mono"
        />
      </div>

      {/* Time and Servings */}
      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="prep_time" className="text-base font-medium">
            Prep Time (mins)
          </Label>
          <Input
            id="prep_time"
            type="number"
            min="0"
            value={updatedRecipe.prep_time_mins || ''}
            onChange={(e) =>
              setUpdatedRecipe((prev) => ({
                ...prev,
                prep_time_mins: parseInt(e.target.value) || 0,
              }))
            }
            placeholder="30"
            className="text-base"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="cook_time" className="text-base font-medium">
            Cook Time (mins)
          </Label>
          <Input
            id="cook_time"
            type="number"
            min="0"
            value={updatedRecipe.cook_time_mins || ''}
            onChange={(e) =>
              setUpdatedRecipe((prev) => ({
                ...prev,
                cook_time_mins: parseInt(e.target.value) || 0,
              }))
            }
            placeholder="45"
            className="text-base"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="servings" className="text-base font-medium">
            Servings
          </Label>
          <Input
            id="servings"
            type="number"
            min="0"
            value={updatedRecipe.servings || ''}
            onChange={(e) =>
              setUpdatedRecipe((prev) => ({
                ...prev,
                servings: parseInt(e.target.value) || 0,
              }))
            }
            placeholder="4"
            className="text-base"
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="pt-4">
        <Button type="submit" size="lg" className="w-full">
          Save Recipe
        </Button>
      </div>
    </form>
  );
}
