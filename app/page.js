import ProductGrid from './components/ProductGrid';
import Pagination from './components/Pagination';

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

export const metadata = {
  title: 'MyStore',
  description: 'The store for me, you and everyone else!',
};


export default async function ProductsPage({ searchParams }) {
  const page = searchParams.page ? parseInt(searchParams.page, 10) : 1;
  
  try {
    const products = await fetchProducts(page); // Fetch products on the server
    return (
      <div>
        <ProductGrid products={products} /> {/* Display products in a grid */}
        <Pagination currentPage={page} /> {/* Display pagination controls */}
      </div>
    );
  } catch (err) {
    // Handle errors (displaying a message or redirecting)
    throw err; // Show 404 page if data fetching fails
  }
}
