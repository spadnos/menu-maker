import { MenuItemFull } from '@/lib/supabase/types'
import MenuItem from '@/components/menu-item'

interface MenuCategoryProps {
  title: string
  items: MenuItemFull[]
}

export function MenuCategory({ title, items }: MenuCategoryProps) {
  return (
    <section className="mb-16">
      <div className="mb-8">
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary mb-3">
          {title}
        </h2>
        <div className="w-full h-px bg-primary/30 max-w-sm" />
        <p className="text-sm text-muted-foreground mt-2">{'description'}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
        {items.map((item, index) => (
          <MenuItem key={index} item={item} />
        ))}
      </div>
    </section>
  )
}
