import Link from 'next/link'
import SignoutButton from '@/components/auth/signout-button'
import { createClient } from '@/utils/supabase/server'

export default async function CustomerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data } = await supabase.auth.getUser()
  const { user } = data

  return (
    <div className="min-h-screen bg-white text-black">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <header className="mb-4 text-center">
          <h1 className="text-4xl font-light tracking-wider mb-2">
            ELEVATED BISTRO
          </h1>
          <div className="w-24 h-px bg-black mx-auto mb-4"></div>
          <p className="text-sm tracking-widest">
            Elevated Location, Elevated Experience
          </p>
          <div className="mt-4 flex justify-center items-center gap-4">
            <Link href="/">
              <span className="text-primary/80 hover:text-primary">Menus</span>
            </Link>
            <Link href="/recipes">
              <span className="text-primary/80 hover:text-primary">
                Recipes
              </span>
            </Link>
            {user && <SignoutButton />}
            {!user && (
              <div className="">
                <p className="text-sm tracking-widest">
                  Please <Link href="/login">login</Link> to view your account.
                </p>
              </div>
            )}
          </div>
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
