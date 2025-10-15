import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const requestUrl = new URL(request.url);

  try {
    // Create a Supabase client with the configured cookie handling
    const supabase = await createClient();

    // Sign out from Supabase
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error('Error during sign out:', error);
      return NextResponse.json(
        { error: 'Failed to sign out' },
        { status: 500 }
      );
    }

    // Create a redirect response to the login page
    const redirectUrl = new URL('/admin/login', requestUrl.origin);

    // Create a response that will clear the auth cookies
    const response = NextResponse.redirect(redirectUrl, { status: 302 });

    // Clear any auth cookies that might be set
    response.cookies.set({
      name: 'sb-access-token',
      value: '',
      path: '/',
      maxAge: 0,
      expires: new Date(0),
    });

    response.cookies.set({
      name: 'sb-refresh-token',
      value: '',
      path: '/',
      maxAge: 0,
      expires: new Date(0),
    });

    return response;
  } catch (error) {
    console.error('Unexpected error in sign out:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
