import MenuItem from '@/components/menu-item'
import { MenuItemFull } from '@/lib/supabase/types'

const MENU = {
  name: 'Elevated Bistro',
  description:
    ' A curated selection of dishes celebrating the finest ingredients and culinary traditions. Experience the art of fine mountain dining.',
  sections: [
    {
      name: 'Cocktails',
      display_order: 4,
      description: 'A selection of classic cocktails.',
      items: [
        {
          id: '1',
          display_order: 1,
          name: 'Gin & Tonic',
          description: 'Gin, tonic water, lime, and a twist of mint.',
          price: '10.00',
        },
        {
          name: 'Mojito',
          display_order: 2,
          description: 'White rum, lime, and a twist of mint.',
          price: '10.00',
        },
        {
          id: '5',
          display_order: 3,
          name: 'Margarita',
          description: 'Tequila, lime, and a twist of mint.',
          price: '10.00',
        },
        {
          id: '6',
          display_order: 4,
          name: 'Manhattan',
          description:
            'Bourbon or rye, vermouth, and a dash of bitters. Topped with a cherry.',
          price: '10.00',
        },
        {
          id: '7',
          display_order: 5,
          name: 'Old Fashioned',
          description:
            'Bourbon or rye, simple syrup, and a dash of bitters. Topped with a cherry.',
          price: '10.00',
        },
        {
          id: '8',
          display_order: 6,
          name: 'Whiskey Sour',
          description:
            'Whiskey, lemon, and a dash of bitters. Topped with a cherry.',
          price: '10.00',
        },
      ],
    },
    {
      name: 'Appetizers',
      display_order: 1,
      items: [
        {
          id: '2',
          display_order: 1,
          name: 'Caprese Salad',
          description: 'Fresh mozzarella, tomatoes, basil, and balsamic glaze.',
          price: '10.00',
        },
      ],
    },
    {
      name: 'BBQ',
      description:
        'A selection of classic BBQ dishes. Most of these are done on the smoker so availability in winter may be limited.',
      display_order: 5,
      items: [
        {
          id: '9',
          display_order: 1,
          name: '321 Ribs',
          description: 'Saucy smoked pork ribs',
          price: '10.00',
        },
        {
          id: '10',
          display_order: 2,
          name: 'Smoked Brisket',
          description: 'Texas-Style smoked brisket',
          price: '10.00',
        },
      ],
    },
    {
      name: 'Main Courses',
      display_order: 2,
      items: [
        {
          id: '3',
          name: 'Grilled Salmon',
          description: 'Fresh salmon, herbs, and a side of quinoa.',
          price: '10.00',
        },
      ],
    },
    {
      name: 'Desserts',
      display_order: 3,
      items: [
        {
          id: '4',
          display_order: 1,
          name: 'Chocolate Lava Cake',
          description: 'Dark chocolate cake with a molten center.',
          price: '10.00',
        },
      ],
    },
  ],
}

export default function MenuPage() {
  const menu = MENU

  return (
    <main className="min-h-screen bg-background py-16 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <header className="text-center mb-16">
          <h1 className="text-6xl md:text-7xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-primary to-black dark:from-primary dark:to-background-light">
            {menu.name}
          </h1>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto leading-relaxed text-pretty">
            {menu.description}
          </p>
        </header>

        {menu.sections.map((section, index) => (
          <section key={index} className="mb-8">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary mb-3 border-b-2 border-primary">
              {section.name}
            </h2>
            <p className="text-muted-foreground text-base md:text-lg mx-auto leading-relaxed text-pretty">
              {section.description}
            </p>
            <div className="mt-4 grid md:grid-cols-2 gap-x-12 gap-y-8">
              {section.items.map((item, index) => (
                <MenuItem key={index} item={item as MenuItemFull} />
              ))}
            </div>
            {/* <MenuCategory
              key={index}
              title={collection.name}
              items={collection.items as MenuItemFull[]}
            /> */}
          </section>
        ))}
      </div>
    </main>
  )
}
