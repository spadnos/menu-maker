import { getMenus } from '@/lib/supabase/menus';
import Link from 'next/link';

export default async function MenuPage() {
  const menus = await getMenus();

  return (
    <div className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-2 md:py-8">
      <div className="mb-8">
        Menus are a collection of recipes presented in menu format. Unlike
        collections, menus can have section and each section can have a title
        and description. Examples are shown below.
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {menus.map((menu) => (
          <Link
            href={`/menus/${menu.id}`}
            key={menu.id}
            className="bg-white rounded-lg p-4"
          >
            <h2 className="text-xl font-bold">{menu.name}</h2>
            <p className="text-gray-600">{menu.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
