// Import global styles and fonts
import './globals.css';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeftIcon } from 'lucide-react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '404 - Page Not Found',
  description: 'The page you are looking for does not exist.',
};

export default function GlobalNotFound() {
  return (
    <html lang="en" className={inter.className}>
      <body className="min-h-screen">
        <header className="max-w-4xl mx-auto px-4 py-8">
          <h1 className="text-4xl font-light tracking-wider mb-2">
            ELEVATED BISTRO
          </h1>
          <div className="w-24 h-px bg-black mx-auto mb-4"></div>
          <p className="text-sm tracking-widest">
            Elocation Location, Elevated Experience
          </p>
          <div className="mt-4">
            <Link href="/">
              <span className="text-primary/80 hover:text-primary">
                View Menu
              </span>
            </Link>
            <Link href="/">
              <span className="text-primary/80 hover:text-primary">
                View Recipe Catalog
              </span>
            </Link>
          </div>
        </header>
        <main className="max-w-4xl mx-auto px-4 py-8">
          <h1>404 - Page Not Found</h1>
          <p>This page does not exist.</p>
          <Link
            className="text-primary/80 hover:text-primary flex items-center gap-2 mt-8"
            href="/"
          >
            <ArrowLeftIcon className="w-4 h-4" /> Return Home
          </Link>
        </main>
      </body>
    </html>
  );
}
