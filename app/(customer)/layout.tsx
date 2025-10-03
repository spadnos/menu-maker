// import { createClient } from '@/utils/supabase/server'

export default async function CustomerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // const supabase = await createClient()
  // const { data } = await supabase.auth.getUser()
  // const { user } = data

  return (
    <div className="min-h-screen bg-white text-black">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <main className="py-8">{children}</main>

        <footer className="mt-16 pt-8 border-t border-gray-200 text-center text-sm text-gray-500">
          <p>
            © {new Date().getFullYear()} Elevated Bistro. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  )
}
