'use server'

import { createClient } from '@/utils/supabase/server'

export async function signout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
}
