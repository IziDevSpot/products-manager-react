// components/ClientProductTable.tsx
'use client'

import React, { useState } from 'react';
import Link from 'next/link';

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

export function ClientProductTable({ initialProducts }: { initialProducts: Product[] }) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [page, setPage] = useState(2);
  const [loading, setLoading] = useState(false);

  const loadMoreProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/products?page=${page}&limit=3`);
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      setProducts([...products, ...data.products]);
      setPage(page + 1);
    } catch (error) {
      console.error("Error fetching more products:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700">
              <th className="px-4 py-2 border-b dark:border-gray-600 text-left">ID</th>
              <th className="px-4 py-2 border-b dark:border-gray-600 text-left">Name</th>
              <th className="px-4 py-2 border-b dark:border-gray-600 text-left">Brand</th>
              <th className="px-4 py-2 border-b dark:border-gray-600 text-left">Year</th>
              <th className="px-4 py-2 border-b dark:border-gray-600 text-left">SKU</th>
              <th className="px-4 py-2 border-b dark:border-gray-600 text-left">EAN</th>
              <th className="px-4 py-2 border-b dark:border-gray-600 text-left">Quantity</th>
              <th className="px-4 py-2 border-b dark:border-gray-600 text-left">Stock</th>
              <th className="px-4 py-2 border-b dark:border-gray-600 text-left">Inventory</th>
              <th className="px-4 py-2 border-b dark:border-gray-600 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product: Product) => (
              <tr key={product.id} className="dark:bg-gray-800 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="px-4 py-2 border-b dark:border-gray-700">{product.id}</td>
                <td className="px-4 py-2 border-b dark:border-gray-700">{product.name || 'N/A'}</td>
                <td className="px-4 py-2 border-b dark:border-gray-700">{product.brand || 'N/A'}</td>
                <td className="px-4 py-2 border-b dark:border-gray-700">{product.year || 'N/A'}</td>
                <td className="px-4 py-2 border-b dark:border-gray-700">{product.sku || 'N/A'}</td>
                <td className="px-4 py-2 border-b dark:border-gray-700">{product.ean || 'N/A'}</td>
                <td className="px-4 py-2 border-b dark:border-gray-700">{product.quantity !== undefined ? product.quantity : 'N/A'}</td>
                <td className="px-4 py-2 border-b dark:border-gray-700">{product.stock !== undefined ? product.stock : 'N/A'}</td>
                <td className="px-4 py-2 border-b dark:border-gray-700">{product.inventory || 'N/A'}</td>
                <td className="px-4 py-2 border-b dark:border-gray-700">
                  <Link 
                    href={`/products/${product.id}/edit`} 
                    className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 transition duration-300"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 text-center">
        <button
          onClick={loadMoreProducts}
          disabled={loading}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:disabled:bg-blue-400 transition duration-300"
        >
          {loading ? 'Loading...' : 'Load More'}
        </button>
      </div>
    </div>
  );
}