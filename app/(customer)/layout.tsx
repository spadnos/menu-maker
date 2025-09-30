import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={`min-h-screen bg-white text-black ${inter.className}`}>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <header className="mb-4 text-center">
          <h1 className="text-4xl font-light tracking-wider mb-2">
            ELEVATED BISTRO
          </h1>
          <div className="w-24 h-px bg-black mx-auto mb-4"></div>
          <p className="text-sm tracking-widest">
            Elocation Location, Elevated Experience
          </p>
        </header>

        <main className="">{children}</main>

        <footer className="mt-16 pt-8 border-t border-gray-200 text-center text-xs text-gray-500">
          <p>
            © {new Date().getFullYear()} Elevated Bistro. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  )
}
