import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createClient } from './src/utils/supabase/middleware';

export async function middleware(request: NextRequest) {
  const { supabase, response } = createClient(request);

  // Check auth status
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // If there's no session and the request is for a protected route, redirect to login
  if (!session && !request.nextUrl.pathname.startsWith('/login')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return response;
}

// Add your protected routes here
export const config = {
  matcher: ['/', '/products/:path*',],
};