const MENUS = [
  {
    id: '1',
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
  },
  {
    id: 'casual-sunday-brunch',
    name: 'Casual Sunday Brunch',
    description: 'A casual brunch menu for a small group on Sunday morning.',
    sections: [
      {
        name: 'Baked Goods & Breads',
        description:
          'Comforting, aromatic baked treats that can be prepared or baked ahead of time.',
        items: [
          {
            name: 'Assorted Pastries',
            description: 'Chocolate croissants and other surprises.',
          },
          {
            name: 'Toasted Artisan Bread',
            description:
              'Serve with butter, assorted jams, and honey for a simple but satisfying addition.',
          },
          {
            name: 'Honey Cake',
            description:
              'A moist, rich cake made with honey, nuts, and spices for a sweet, belated, New Year.',
          },
        ],
      },
      {
        name: 'Egg & Savory Dishes',
        description: '',
        items: [
          {
            name: 'Assorted Quiches',
            description:
              'Choose from a selection of quiches made with fresh ingredients.',
          },
          {
            name: 'Smoked Salmon Platter',
            description:
              'Smoked salmon with cream cheese, capers, red onion, and bagels.',
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
            description: 'Assorted fruits in a honey lime dressing.',
          },
          {
            name: 'Tzatziki',
            description: 'Cucumber yogurt salad.',
          },
          {
            name: 'Tomato and Feta Salad',
            description: 'Or else...',
          },
        ],
      },
      {
        name: 'Protein Sides',
        description:
          'Savory accompaniments that can be cooked or finished quickly in the oven or skillet.',
        items: [
          {
            name: 'Lockford Sausages',
            description:
              'There is usually a line out the door for sausages in Lockford. Not much else happening in Lockford.',
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
            name: 'Fresh Orange',
            description: '',
          },
          {
            name: 'DIY Mimosa',
            description: 'Sparkling wine and orange juice.',
          },
          {
            name: 'Aperol Spritz',
            description: 'Aperol, prosecco, and sparkling water.',
          },
        ],
      },
    ],
  },
  {
    id: 'elevated-bistro',
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
            description:
              'Fresh mozzarella, tomatoes, basil, and balsamic glaze.',
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
  },
];

export const getMenus = async () => {
  return MENUS;
};

export const getMenuById = async (id: string) => {
  const menu = MENUS.find((menu) => menu.id === id);
  console.log('menu', id, menu);
  if (!menu) {
    return null;
  }
  return menu;
};
