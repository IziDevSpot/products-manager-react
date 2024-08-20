// components/ProductTable.tsx
import React from 'react';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import { ClientProductTable } from './ClientProductTable';

type Product = {
  id: number;
  name: string;
  brand: string;
  year: number;
  sku: string;
  ean: string;
  quantity: number;
  stock: number;
  inventory: string;
};

export async function ProductTable() {
  const cookieStore = cookies();
  const supabase = createClient();
  const { data: initialProducts, error } = await supabase
    .from("products")
    .select()
    .range(0, 2); // Fetch first 3 products (0-2 inclusive)

  if (error) {
    console.error("Error fetching initial products:", error);
    return <div>Error loading products. Please try again later.</div>;
  }

  return <ClientProductTable initialProducts={initialProducts || []} />;
}