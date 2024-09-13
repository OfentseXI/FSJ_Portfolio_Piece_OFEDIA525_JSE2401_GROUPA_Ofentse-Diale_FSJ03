"use client";

import { useState, useEffect } from 'react';
import ProductGrid from './components/ProductGrid';
import Pagination from './components/Pagination';
import Loading from './loading'; // Use the global loading spinner
import ErrorPage from './components/ErrorPage'; // Import the ErrorPage component

/**
 * Fetch products from the API with pagination.
 *
 * @param {number} page - The page number for pagination.
 * @param {number} limit - The number of products to fetch per page.
 * @returns {Promise<Object[]>} A promise that resolves to the array of products.
 * @throws {Error} Throws an error if the fetch request fails.
 */
async function fetchProducts(page = 1, limit = 20) {
  const skip = (page - 1) * limit;
  const response = await fetch(`https://next-ecommerce-api.vercel.app/products?limit=${limit}&skip=${skip}`);
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  return response.json();
}

/**
 * ProductsPage component to display a list of products with pagination.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.searchParams - The search parameters from the URL.
 * @param {string} [props.searchParams.page] - The current page number from the URL.
 * @returns {JSX.Element} The rendered ProductsPage component.
 */
export default function ProductsPage({ searchParams }) {
  const page = searchParams.page ? parseInt(searchParams.page, 10) : 1;
  const [products, setProducts] = useState([]); // State to manage the list of products
  const [loading, setLoading] = useState(true); // State to manage loading status
  const [error, setError] = useState(null); // State to manage error status

  /**
   * Fetch products when the component mounts or the page changes.
   */
  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true); // Set loading to true while fetching data
      setError(null); // Reset error state before fetching
      try {
        const productsData = await fetchProducts(page);
        setProducts(productsData); // Update products state with fetched data
      } catch (err) {
        setError('Failed to load products. Please try again later.'); // Update error state on failure
      } finally {
        setLoading(false); // Disable loading state after fetching is complete
      }
    };
    loadProducts();
  }, [page]); // Dependency array to refetch products when the page changes

  if (loading) {
    return <Loading />; // Show loading spinner while data is being fetched
  }

  if (error) {
    return <ErrorPage message={error} />; // Show error page if there's an error
  }

  return (
    <div>
      <ProductGrid products={products} /> {/* Display products in a grid */}
      <Pagination currentPage={page} /> {/* Display pagination controls */}
    </div>
  );
}
