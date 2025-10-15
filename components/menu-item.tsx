import Link from 'next/link';
// import { ArrowRight } from 'lucide-react'
import type { MenuItemFull } from '@/lib/supabase/types';

interface MenuItemProps {
  item: MenuItemFull;
}

export default function MenuItem({ item }: MenuItemProps) {
  return (
    <div className="flex justify-between gap-4 group">
      <div className="flex-1">
        <h3 className="font-serif text-lg font-semibold text-foreground mb-1.5">
          {item.name}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {item.description}
        </p>
      </div>

      <div className="flex-shrink-0 text-xs">
        {item.recipe && (
          <Link
            href={`/recipe/${item.id}`}
            className="text-sm font-medium text-primary hover:underline"
          >
            View Recipe →
          </Link>
        )}
      </div>
    </div>
  );
}
