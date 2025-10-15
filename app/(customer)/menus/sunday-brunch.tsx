import MenuItem from '@/components/menu-item';
import { MenuItemFull } from '@/lib/supabase/types';

const MENU = {
  name: 'Casual Sunday Brunch Menu',
  description:
    'A relaxed, home-style brunch menu designed for easy preparation. Most dishes can be made or prepped the day before, so you can enjoy your Sunday morning with minimal effort.',
  sections: [
    {
      name: 'Baked Goods & Breads',
      description:
        'Comforting, aromatic baked treats that can be prepared or baked ahead of time.',
      items: [
        {
          name: 'Overnight Cinnamon Roll Bake',
          description:
            'Assemble the rolls the night before and bake them fresh in the morning for a warm, gooey centerpiece.',
        },
        {
          name: 'Mini Muffins',
          description:
            'Choose from blueberry, banana, or lemon-poppy seed. Bake ahead and reheat gently before serving.',
        },
        {
          name: 'Toasted Artisan Bread',
          description:
            'Serve with butter, assorted jams, and honey for a simple but satisfying addition.',
        },
      ],
    },
    {
      name: 'Egg & Savory Dishes',
      description:
        'Protein-rich favorites that reheat beautifully or require minimal morning effort.',
      items: [
        {
          name: 'Make-Ahead Egg Frittata',
          description:
            'Filled with spinach, mushrooms, and cheese. Bake in advance and warm before serving.',
        },
        {
          name: 'Mini Quiches',
          description:
            'Use store-bought shells or go crustless. Fill with your choice of vegetables, meats, or cheese.',
        },
        {
          name: 'Smoked Salmon Platter',
          description:
            'Arrange smoked salmon with cream cheese, capers, red onion, and bagels for a no-cook option.',
        },
      ],
    },
    {
      name: 'Fresh & Light',
      description:
        'Bright and refreshing options to balance out the richer brunch dishes.',
      items: [
        {
          name: 'Seasonal Fruit Salad',
          description:
            'Combine fresh fruit and coat with a light citrus-honey glaze prepared the night before.',
        },
        {
          name: 'Simple Green Salad',
          description:
            'Mix seasonal greens and serve with a homemade vinaigrette made in advance.',
        },
        {
          name: 'Yogurt Parfaits',
          description:
            'Layer Greek yogurt, granola, and fresh berries. Assemble just before serving for the best texture.',
        },
      ],
    },
    {
      name: 'Protein Sides',
      description:
        'Savory accompaniments that can be cooked or finished quickly in the oven or skillet.',
      items: [
        {
          name: 'Maple-Glazed Bacon',
          description:
            'Bake until nearly done, then finish with a maple glaze just before serving.',
        },
        {
          name: 'Chicken Apple Sausages',
          description:
            'Precooked sausages that can be quickly browned or warmed in the oven before serving.',
        },
      ],
    },
    {
      name: 'Drinks',
      description:
        'A mix of warm and refreshing beverages to complete the brunch experience.',
      items: [
        {
          name: 'Freshly Brewed Coffee and Assorted Teas',
          description:
            'Offer a small selection of roasts and herbal teas for guests to choose from.',
        },
        {
          name: 'Fresh Orange or Grapefruit Juice',
          description:
            'Serve chilled in pitchers or carafes for easy self-service.',
        },
        {
          name: 'Brunch Punch',
          description:
            'A festive blend of sparkling water or prosecco with juice and fresh fruit slices.',
        },
      ],
    },
  ],
};

export default function MenuPage() {
  const menu = MENU;

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
  );
}
