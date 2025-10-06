const Motivations = [
  {
    title: 'Creating recipes should be easy',
    content: [
      "I've tried using wordpress, but creating recipes was separated from viewing recipes. I wanted to create and view recipes from the same place.",
      'Recipes should be created from the same place as the recipe is viewed. I dont want to have one site to publish and a different site to view',
    ],
  },
  {
    title: 'Collect all my recipes in one place',
    content: [
      `There are 1000s of recipe sites. Each one allows you to create a recipe box,
      but then you still have many sites to search through. I want to collect all my recipes in one place.
      This replaces a lot of bookmarks, a spreadsheet, or other ad-hoc approaches.`,
    ],
  },
  {
    title: 'Avoid all the advertising, popups, and other distractions',
    content: [
      'Many websites have good recipes, but you have to get through advertising, popups, and other distractions to get to the recipe. Often the sites are practically unusable. I have frequenntly given up on the recipe because getting to the recipe was too much of a hassle.',
    ],
  },
  {
    title: 'Any user can create recipes',
    content: [
      'Most sites are maintained by a single person or a small group of people. I want to allow any user to create recipes.',
      'I want to allow any user to create recipes.',
    ],
  },
  {
    title: 'Allow users to create and share menus built from recipes',
    content: ['Allow users to create and share menus built from recipes'],
  },
  {
    title: 'Allow users to create and share meal plans',
    content: ['Allow users to create and share meal plans'],
  },
];

function Motivation({ title, content }: { title: string; content: string[] }) {
  return (
    <div className="space-y-2">
      <h3 className="font-serif text-xl font-bold text-foreground mb-2 text-balance capitalize">
        {title}
      </h3>
      {content.map((line, index) => (
        <p key={index} className="text-balance">
          {line}
        </p>
      ))}
    </div>
  );
}

function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto mt-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-4 text-balance">
          About
        </h1>
      </div>

      <div className="flex flex-col gap-4 justify-between items-center mb-8">
        <p>
          Menu Maker is a web application that allows you to create and share
          recipes. There are thousands of recipes sites. Why does the world need
          another?
        </p>
      </div>
      <div className="flex flex-col justify-between mb-8">
        <h2 className="text-center font-serif text-3xl font-bold text-foreground mb-4 text-balance">
          Motivation
        </h2>
        <ul className="space-y-4">
          {Motivations.map((motivation, index) => (
            <li key={index}>
              <Motivation
                title={motivation.title}
                content={motivation.content}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
export default AboutPage;
