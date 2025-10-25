'use client';

import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
// import { importRecipeFromUrl } from '@/lib/supabase/import-recipe';
import { createRecipe } from '@/lib/supabase/recipes';
// import { extractRecipeFromUrl } from '@/app/ai/flows/recipe-extraction';
import { parseRecipe } from '@/lib/recipe-parser';

export function ImportRecipeButton() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleImport = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!url.trim()) {
      toast.error('Please enter a URL');
      return;
    }

    setLoading(true);

    try {
      // Import recipe from URL using AI
      toast.info('Importing recipe... This may take a few seconds.');
      // const result = await importRecipeFromUrl(url);
      const result = await parseRecipe(url);
      // const result = { success: false, data: null, error: null };
      // toast.info('trying Gemini...please wait');
      // await extractRecipeFromUrl(url);

      if (!result.success || !result.data) {
        toast.error(result.error || 'Failed to import recipe');
        setLoading(false);
        return;
      }

      await createRecipe(result.data);

      toast.success('Recipe imported successfully!');
      setOpen(false);
      setUrl('');
      router.refresh();
    } catch (error) {
      console.error('Error importing recipe:', error);
      toast.error('Failed to import recipe');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="rounded-full shadow-lg">
          <Download className="h-6 w-6" />
          <span>Import recipe</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-primary">
            Import Recipe from URL
          </DialogTitle>
          <DialogDescription>
            Enter a URL to a recipe webpage. We&apos;ll use AI to extract the
            recipe details automatically.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleImport} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="url">Recipe URL</Label>
            <Input
              id="url"
              type="url"
              placeholder="https://example.com/recipe"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              disabled={loading}
              required
            />
            <p className="text-sm text-muted-foreground">
              Supported: Most recipe websites (AllRecipes, Food Network, NYT
              Cooking, etc.)
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={loading}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading} className="flex-1">
              {loading ? 'Importing...' : 'Import Recipe'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
