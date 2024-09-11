"use client";

import { useState, useEffect } from 'react';
import ProductGrid from './components/ProductGrid';
import Pagination from './components/Pagination';
import Loading from './loading'; // Use the global loading spinner

async function fetchProducts(page = 1, limit = 20) {
  const skip = (page - 1) * limit;
  const response = await fetch(`https://next-ecommerce-api.vercel.app/products?limit=${limit}&skip=${skip}`);
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  return response.json();
}

export default function ProductsPage({ searchParams }) {
  const page = searchParams.page ? parseInt(searchParams.page, 10) : 1;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Manage loading state
  const [error, setError] = useState(null); // Manage error state

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true); // Set loading to true while fetching data
      setError(null);
      try {
        const productsData = await fetchProducts(page);
        setProducts(productsData);
      } catch (err) {
        setError('Failed to load products. Please try again later.');
      } finally {
        setLoading(false); // Disable loading after fetching is done
      }
    };
    loadProducts();
  }, [page]);

  if (loading) {
    return <Loading />; // Use the global loading spinner while data is being fetched
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <ProductGrid products={products} />
      <Pagination currentPage={page} />
    </div>
  );
}
