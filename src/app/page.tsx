import React from 'react';
import { cookies } from 'next/headers';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { ProductTable } from '@/app/components/ProductTable';
import { ThemeProvider } from '@/app/components/ThemeProvider';
import { ThemeToggle } from '@/app/components/ThemeToggle';
import SplashScreenClient from '@/app/components/SplashScreen';
import Logout from '@/app/components/Logout';

async function checkAuth() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session) {
    redirect('/login');
  }
  
  return session;
}

export default async function Home() {
  await checkAuth(); // This will redirect to /login if not authenticated

  return (
    <ThemeProvider>
      <SplashScreenClient>
        <div className="container mx-auto p-4 bg-white dark:bg-gray-800 text-black dark:text-white">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Products</h1>
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <Logout />
            </div>
          </div>
          <ProductTable />
        </div>
      </SplashScreenClient>
    </ThemeProvider>
  );
}