'use client';

import { useState } from 'react';
import Menu1 from './menu1';
import Menu2 from './menu2';

export default function MenuPage() {
  const [menu, setMenu] = useState('menu1');

  return (
    <main className="min-h-screen bg-background py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-4 text-balance">
            Menus
          </h1>
        </div>
        <div className="mb-8">
          Menus are recipes presented in menu format. Unlike collections, menus
          can have section and each section can have a title and description.
          Examples are shown below.
        </div>
        {/* Header */}
        <div className="flex items-center">
          <select
            className="border border-gray-300 rounded-md p-2"
            onChange={(e) => {
              const selectedMenu = e.target.value;
              setMenu(selectedMenu);
            }}
          >
            <option value="menu1">Menu 1</option>
            <option value="menu2">Menu 2</option>
          </select>
        </div>
        {menu === 'menu1' && <Menu1 />}
        {menu === 'menu2' && <Menu2 />}
      </div>
    </main>
  );
}
