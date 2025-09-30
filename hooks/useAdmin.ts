'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'

export function useAdmin() {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession()

        if (!session) {
          router.push('/login')
          return
        }

        // For now, we're just checking if the email is admin@example.com
        // In a real app, you'd want to check a role or permission
        const isUserAdmin = session.user.email === 'admin@example.com'

        if (!isUserAdmin) {
          router.push('/unauthorized')
          return
        }

        setIsAdmin(true)
      } catch (error) {
        console.error('Error checking admin status:', error)
        router.push('/login')
      } finally {
        setLoading(false)
      }
    }

    checkAdmin()
  }, [router, supabase])

  return { isAdmin, loading }
}
