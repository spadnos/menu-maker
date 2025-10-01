'use client'

import { signout } from './actions'

function SignoutButton() {
  return <button onClick={signout}>Sign out</button>
}
export default SignoutButton
