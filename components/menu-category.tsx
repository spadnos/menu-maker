import { MenuItem } from './menu-item'

interface MenuItemData {
  name: string
  description: string
  price: string
}

interface MenuCategoryProps {
  title: string
  items: MenuItemData[]
}

export function MenuCategory({ title, items }: MenuCategoryProps) {
  return (
    <section className="mb-16">
      <div className="mb-8">
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary text-center mb-3">
          {title}
        </h2>
        <div className="w-full h-px bg-primary/30 max-w-sm mx-auto" />
      </div>

      <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
        {items.map((item, index) => (
          <MenuItem key={index} item={item} />
        ))}
      </div>
    </section>
  )
}
