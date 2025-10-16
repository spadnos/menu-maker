'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { createClient } from '@/utils/supabase/server';

export async function login(formData: FormData) {
  const supabase = await createClient();

  // Validate inputs
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    redirect('/error?message=Email and password are required');
  }

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error('Login error:', error.message);
    redirect(`/error?message=${encodeURIComponent(error.message)}`);
  }

  revalidatePath('/', 'layout');
  redirect('/');
}

export async function signup(formData: FormData) {
  const supabase = await createClient();

  // Validate inputs
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    redirect('/error?message=Email and password are required');
  }

  // Validate password length
  if (password.length < 6) {
    redirect('/error?message=Password must be at least 6 characters');
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    console.error('Signup error:', error.message);
    redirect(`/error?message=${encodeURIComponent(error.message)}`);
  }

  revalidatePath('/', 'layout');
  redirect('/');
}
