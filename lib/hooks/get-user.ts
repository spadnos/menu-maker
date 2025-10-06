import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { User } from '@supabase/supabase-js';
import { usePathname, useRouter } from 'next/navigation';

const supabase = createClient();

export function useUser() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Get the current user session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setCurrentUser(session?.user ?? null);
    });

    // Listen for auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        setCurrentUser(session.user);
        // If user was on login page, redirect to home after successful auth
        if (pathname === '/login') {
          router.push('/');
        }
      } else {
        setCurrentUser(null);
        // If user is not on a public page, redirect to home
        const publicRoutes = ['/', '/login', '/signup', '/about'];
        if (!publicRoutes.includes(pathname)) {
          router.push('/');
        }
      }
    });

    // Cleanup subscription on unmount
    return () => {
      subscription.unsubscribe();
    };
  }, [pathname, router]);

  return {
    user: currentUser,
  };
}
