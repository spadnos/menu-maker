import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

type UserRole = 'admin' | 'user';

export async function getCurrentUser() {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return null;
  }

  return user;
}

export async function requireUser(redirectTo = '/login') {
  const user = await getCurrentUser();

  if (!user) {
    redirect(redirectTo);
  }

  return user;
}

export async function requireAdmin(redirectTo = '/unauthorized') {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/login');
    return; // This line will never be reached, but TypeScript doesn't know that
  }

  // In a real app, you would check the user's role here
  // For now, we'll just check if the email is the admin email
  const isAdmin = user.email === 'admin@example.com';

  if (!isAdmin) {
    redirect(redirectTo);
  }

  return user;
}

export async function isUserAdmin(userId: string): Promise<boolean> {
  const supabase = await createClient();

  // In a real app, you would check the user's role in your database
  // For now, we'll just check if the email is the admin email
  const { data: user } = await supabase.auth.admin.getUserById(userId);
  return user.user?.email === 'admin@example.com';
}

export async function getUserRole(userId: string): Promise<UserRole> {
  const isAdmin = await isUserAdmin(userId);
  return isAdmin ? 'admin' : 'user';
}

export async function checkPermission(
  userId: string,
  requiredRole: UserRole
): Promise<boolean> {
  if (requiredRole === 'user') {
    return true; // All logged-in users have 'user' role
  }

  // For admin role, check if the user is an admin
  return isUserAdmin(userId);
}

export async function requirePermission(
  requiredRole: UserRole = 'user',
  redirectTo = '/unauthorized'
) {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/login');
    return; // This line will never be reached, but TypeScript doesn't know that
  }

  const hasPermission = await checkPermission(user.id, requiredRole);

  if (!hasPermission) {
    redirect(redirectTo);
  }

  return user;
}
