import MenuItem from '@/components/menu-item';
import { getMenuById } from '@/lib/supabase/menus';
import { MenuItemFull } from '@/lib/supabase/types';
import Link from 'next/link';

interface MenuPageProps {
  params: Promise<{ id: string }>;
}

export default async function MenuPage({ params }: MenuPageProps) {
  const { id } = await params;

  const menu = await getMenuById(id);

  console.log('menu', menu);

  if (!menu) {
    return (
      <div className="text-center">
        <p>Recipe not found</p>
        <Link href="/">
          <span className="text-primary/80 hover:text-primary">
            Return to recipe catalog
          </span>
        </Link>
      </div>
    );
  }

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
