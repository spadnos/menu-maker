'use client'

import { createClient } from '@/utils/supabase/client'
import { Session } from '@supabase/supabase-js'
import { createContext, useContext, useState, useEffect } from 'react'

type SupabaseContextType = {
  supabase: ReturnType<typeof createClient>
  session: Session | null
}

const SupabaseContext = createContext<SupabaseContextType | undefined>(
  undefined
)

type ProvidersProps = {
  children: React.ReactNode
  session: Session | null
}

export function useSupabase() {
  const context = useContext(SupabaseContext)
  if (context === undefined) {
    throw new Error('useSupabase must be used within a Providers')
  }
  return context
}

export function Providers({
  children,
  session: initialSession,
}: ProvidersProps) {
  const [supabase] = useState(() => createClient())
  const [session, setSession] = useState<Session | null>(initialSession)

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => {
      subscription?.unsubscribe()
    }
  }, [supabase])

  return (
    <SupabaseContext.Provider value={{ supabase, session }}>
      {children}
    </SupabaseContext.Provider>
  )
}
