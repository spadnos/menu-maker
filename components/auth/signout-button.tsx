'use client';

import { signout } from '@/lib/auth';
import { Button } from '@/components/ui/button';

function SignoutButton() {
  return <Button onClick={signout}>Sign out</Button>;
}
export default SignoutButton;
