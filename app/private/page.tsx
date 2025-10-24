import { redirect } from 'next/navigation';
import SignoutButton from '@/components/auth/signout-button';
import { createClient } from '@/utils/supabase/server';

export default async function PrivatePage() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  console.log('data', data);
  console.log('error', error);
  if (error || !data?.user) {
    redirect('/login');
  }

  return (
    <div>
      <p>Hello {data.user.email}</p>
      <SignoutButton />
    </div>
  );
}
