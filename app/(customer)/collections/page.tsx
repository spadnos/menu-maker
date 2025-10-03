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
]

function RecipeCollections() {
  return (
    <div>
      {COLLECTIONS.map((collection, index) => (
        <div key={index}>{collection.name}</div>
      ))}
    </div>
  )
}
export default RecipeCollections
