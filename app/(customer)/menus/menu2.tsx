import MenuItem from '@/components/menu-item';
import { MenuItemFull } from '@/lib/supabase/types';

const MENU = {
  name: 'A Classic Christmas Eve Dinner',
  description:
    'A menu celebrating timeless holiday traditions with warmth and elegance.',
  sections: [
    {
      name: 'Cocktails & Appetizers',
      description:
        'To be enjoyed upon arrival, encouraging mingling and festive cheer.',
      items: [
        {
          name: 'Classic Shrimp Cocktail',
          description:
            'Chilled jumbo shrimp served with a zesty, homemade cocktail sauce with a hint of horseradish and a wedge of fresh lemon. A timeless and refreshing start.',
        },
        {
          name: 'Baked Brie en Croûte',
          description:
            'A wheel of creamy brie wrapped in puff pastry, baked until golden brown, and served warm with cranberry-orange compote, toasted walnuts, crackers, and sliced apples.',
        },
        {
          name: 'Signature Cocktail: The Poinsettia Sparkler',
          description:
            'A festive mix of cranberry juice, a splash of orange liqueur, and topped with chilled Prosecco or Champagne. Garnished with fresh cranberries and a sprig of rosemary.',
        },
      ],
    },
    {
      name: 'First Course',
      description: 'A warm and elegant seated starter.',
      items: [
        {
          name: 'Creamy Butternut Squash Soup',
          description:
            'A velvety, roasted butternut squash soup, delicately spiced with nutmeg and a hint of cinnamon. Garnished with a drizzle of créme fraîche, toasted pumpkin seeds, and crispy sage leaves.',
        },
      ],
    },
    {
      name: 'The Main Event',
      description: 'The show-stopping centerpiece of the meal.',
      items: [
        {
          name: 'Roasted Prime Rib with a Garlic and Herb Crust',
          description:
            'A magnificent standing rib roast, perfectly cooked to medium-rare, with a crisp, savory crust of fresh rosemary, thyme, and garlic. Served with a rich au jus and creamy horseradish sauce.',
        },
        {
          name: 'Alternative Main: Honey-Glazed Spiral Ham',
          description:
            'A beautiful spiral-cut ham decorated with cloves and glazed with a mixture of honey, brown sugar, and Dijon mustard.',
        },
        {
          name: 'Alternative Main: Beef Tenderloin with a Red Wine Reduction',
          description:
            'An incredibly tender whole beef tenderloin, roasted and served with a luxurious sauce made from red wine, shallots, and beef stock.',
        },
      ],
    },
    {
      name: 'Classic Side Dishes',
      description: 'The essential accompaniments to complete the feast.',
      items: [
        {
          name: 'Creamy Garlic Mashed Potatoes',
          description:
            'Fluffy, buttery mashed potatoes whipped with roasted garlic and cream for a rich, indulgent flavor.',
        },
        {
          name: 'Roasted Brussels Sprouts with Pancetta and Balsamic Glaze',
          description:
            'Brussels sprouts roasted until tender and slightly caramelized, tossed with crispy pancetta, and drizzled with a sweet and tangy balsamic glaze.',
        },
        {
          name: 'Classic Yorkshire Puddings',
          description:
            'Light, airy, and crisp popovers, perfect for soaking up the delicious au jus from the prime rib.',
        },
        {
          name: 'Glazed Carrots with a Hint of Orange',
          description:
            'Tender-cooked carrots tossed in a butter and brown sugar glaze infused with a touch of fresh orange zest.',
        },
        {
          name: 'Warm Dinner Rolls with Whipped Butter',
          description: 'Soft, pillowy rolls served warm from the oven.',
        },
      ],
    },
    {
      name: 'Decadent Desserts',
      description: 'A sweet and cozy finish to a perfect meal.',
      items: [
        {
          name: 'Bûche de Noël (Yule Log Cake)',
          description:
            "A light chocolate sponge cake, rolled with a whipped cream filling, and frosted with rich chocolate buttercream, textured to resemble bark. Decorated with meringue mushrooms and powdered sugar 'snow'.",
        },
        {
          name: 'Alternative Dessert: Sticky Toffee Pudding',
          description:
            'A warm, moist date sponge cake drenched in a decadent toffee sauce and served with a scoop of vanilla bean ice cream.',
        },
        {
          name: 'Alternative Dessert: Classic Gingerbread Cookies & a Hot Cocoa Bar',
          description:
            'A casual option with decorated gingerbread men and a station with hot cocoa, whipped cream, chocolate shavings, and marshmallows.',
        },
      ],
    },
    {
      name: 'Festive Beverages',
      description: 'To enjoy throughout the evening.',
      items: [
        {
          name: 'Wine Pairing',
          description:
            'Red: A full-bodied Cabernet Sauvignon or a Bordeaux blend. White: An oaked Chardonnay or a dry Riesling.',
        },
        {
          name: 'Non-Alcoholic',
          description:
            'Sparkling Apple-Cranberry Cider and Warm Mulled Spiced Apple Cider.',
        },
        {
          name: 'After Dinner',
          description:
            'Freshly brewed coffee, decaf, a selection of teas, Port, aged brandy, or a creamy eggnog (spiked or not).',
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
