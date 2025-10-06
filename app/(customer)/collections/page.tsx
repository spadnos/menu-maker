const COLLECTIONS = [
  {
    name: 'Cocktails',
    display_order: 1,
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
    name: 'Desserts',
    display_order: 2,
    description: 'A selection of desserts',
    items: [],
  },
  {
    name: 'Chicken',
    display_order: 2,
    description: 'Chicken Recipes',
    items: [],
  },
  { name: 'BBQ', display_order: 2, description: 'BBQ Recipes', items: [] },
];

function RecipeCollections() {
  return (
    <div className="min-h-screen bg-background py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-4 text-balance">
            Collections
          </h1>
        </div>
        <div className="mb-8">
          Collections are just groups of recipes. Examples are shown below. Do I
          really need collections?
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {COLLECTIONS.map((collection, index) => (
            <div key={index} className="bg-card p-4 rounded-lg">
              <h2 className="font-bold text-xl">{collection.name}</h2>
              <p className="text-muted-foreground">{collection.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default RecipeCollections;
