import { Playfair_Display } from 'next/font/google'

const playfair = Playfair_Display({ subsets: ['latin'] })

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-6">
          <h1 className={`text-4xl font-bold ${playfair.className}`}>
            Bistro Menu
          </h1>
          <p className="mt-2 text-muted-foreground">
            Discover our exquisite selection of dishes
          </p>
        </div>
      </header>
      <main>{children}</main>
      <footer className="mt-16 border-t py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Menu Maker. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
