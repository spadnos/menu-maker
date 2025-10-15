'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { MenuItemFull } from '@/lib/supabase/types';

interface MenuItemCardProps {
  item: MenuItemFull;
}

export function MenuItemCard({ item }: MenuItemCardProps) {
  return (
    <Card className="overflow-hidden transition-shadow hover:shadow-lg">
      {item.image_url ? (
        <div className="relative aspect-video w-full">
          <Image
            src={item.image_url}
            alt={item.name}
            width={48}
            height={48}
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={false}
          />
        </div>
      ) : (
        <div className="flex h-48 w-full items-center justify-center bg-muted">
          <span className="text-muted-foreground">No image available</span>
        </div>
      )}
      <CardHeader>
        <CardTitle className="text-xl">{item.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-sm text-muted-foreground">{item.description}</p>
        {item.recipe && (
          <Link
            href={`/recipe/${item.id}`}
            className="text-sm font-medium text-primary hover:underline"
          >
            View Recipe →
          </Link>
        )}
      </CardContent>
    </Card>
  );
}
