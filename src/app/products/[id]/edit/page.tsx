'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from '../../../components/ThemeProvider';
import { withAuthProtection } from '@/utils/withAuthProtection';
import { createClient } from '@/utils/supabase/client';

type Product = {
  id: number;
  name: string;
  brand: string;
  year: number;
  quantity: number;
  stock: number;
  sku: string;
  ean: string;
  inventory: string;
};

function EditProduct({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { theme } = useTheme();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data, error } = await supabase
          .from("products")
          .select()
          .eq('id', params.id)
          .single();

        if (error) throw error;
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [params.id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!product) return;
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: ['year', 'quantity', 'stock'].includes(name) ? parseInt(value, 10) : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!product) return;
    try {
      const { error } = await supabase
        .from("products")
        .update(product)
        .eq('id', product.id);

      if (error) throw error;
     
      // Revalidate the main page and the specific product page
      await fetch(`/api/revalidate?path=/`);
      await fetch(`/api/revalidate?path=/products/${product.id}`);
     
      router.push('/');
      router.refresh(); // Force a refresh of the page data
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  if (loading) {
    return <div className={`text-center ${theme === 'dark' ? 'text-white' : 'text-black'}`}>Loading...</div>;
  }

  if (!product) {
    return <div className={`text-center ${theme === 'dark' ? 'text-white' : 'text-black'}`}>Product not found</div>;
  }

  return (
    <div className={`container mx-auto p-4 ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
      <h1 className="text-2xl font-bold mb-4">Edit Product</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block mb-1">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={product.name}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-black'}`}
            required
          />
        </div>
        <div>
          <label htmlFor="brand" className="block mb-1">Brand:</label>
          <input
            type="text"
            id="brand"
            name="brand"
            value={product.brand}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-black'}`}
            required
          />
        </div>
        <div>
          <label htmlFor="year" className="block mb-1">Year:</label>
          <input
            type="number"
            id="year"
            name="year"
            value={product.year}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-black'}`}
            required
          />
        </div>
        <div>
          <label htmlFor="quantity" className="block mb-1">Quantity:</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={product.quantity}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-black'}`}
            required
          />
        </div>
        <div>
          <label htmlFor="stock" className="block mb-1">Stock:</label>
          <input
            type="number"
            id="stock"
            name="stock"
            value={product.stock}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-black'}`}
            required
          />
        </div>
        <div>
          <label htmlFor="sku" className="block mb-1">SKU:</label>
          <input
            type="text"
            id="sku"
            name="sku"
            value={product.sku}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-black'}`}
            required
          />
        </div>
        <div>
          <label htmlFor="ean" className="block mb-1">EAN:</label>
          <input
            type="text"
            id="ean"
            name="ean"
            value={product.ean}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-black'}`}
            required
          />
        </div>
        <div>
          <label htmlFor="inventory" className="block mb-1">Inventory:</label>
          <input
            type="text"
            id="inventory"
            name="inventory"
            value={product.inventory}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-black'}`}
            required
          />
        </div>
        <button 
          type="submit" 
          className={`px-4 py-2 rounded ${theme === 'dark' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white transition duration-300`}
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default EditProduct;