'use client'

import { SearchX } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface EmptyStateProps {
  onClear: () => void
}

export function EmptyState({ onClear }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <SearchX className="mb-4 h-16 w-16 text-muted-foreground" />
      <h3 className="mb-2 text-lg font-semibold">No items found</h3>
      <p className="mb-4 text-sm text-muted-foreground">
        Try adjusting your search or filters to find what you&apos;re looking
        for.
      </p>
      <Button variant="outline" onClick={onClear}>
        Clear Filters
      </Button>
    </div>
  )
}
