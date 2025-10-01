'use client'

import { signout } from './actions'
import { Button } from '@/components/ui/button'

function SignoutButton() {
  return <Button onClick={signout}>Sign out</Button>
}
export default SignoutButton
