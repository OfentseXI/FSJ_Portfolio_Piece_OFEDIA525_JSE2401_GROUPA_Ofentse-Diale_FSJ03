import ProductGrid from './components/ProductGrid';
import Pagination from './components/Pagination';

/**
 * Fetch products from the API with pagination, search, category filtering, and sorting.
 *
 * @param {number} page - The page number for pagination.
 * @param {number} limit - The number of products to fetch per page.
 * @param {string} search - The search term for filtering products.
 * @param {string} category - The category to filter products by.
 * @param {string} sortBy - The field to sort the products by.
 * @param {string} order - The order of sorting (asc or desc).
 * @returns {Promise<Object[]>} A promise that resolves to the array of products.
 * @throws {Error} Throws an error if the fetch request fails.
 */
async function fetchProducts({ 
  page = 1, 
  limit = 20, 
  search = '', 
  category = '', 
  sortBy = 'price',  // Default to price if not provided
  order = 'asc' 
} = {}) {
  // Build individual query strings for Firebase
  const limitQuery = `limit=${limit}`;
  const pageQuery = `page=${page}`;
  const sortByQuery = `sortBy=${sortBy}`;
  const orderQuery = `order=${order}`;
  const searchQuery = search ? `search=${encodeURIComponent(search)}` : '';
  const categoryQuery = category ? `category=${encodeURIComponent(category)}` : '';

  // Combine the query strings into a single string
  const queryString = [limitQuery, pageQuery, sortByQuery, orderQuery, searchQuery, categoryQuery]
    .filter(Boolean)
    .join('&');

  const response = await fetch(`http://localhost:3000/api/products?${queryString.toString()}
  `);
  
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
 * @returns {JSX.Element} The rendered ProductsPage component.
 */
export const metadata = {
  title: 'MyStore',
  description: 'The store for me, you and everyone else!',
};

export default async function ProductsPage({ searchParams }) {
  const page = searchParams.page ? parseInt(searchParams.page, 10) : 1;
  const search = searchParams.search || '';  // Handle search parameter
  const category = searchParams.category || '';  // Handle category parameter
  const sortBy = searchParams.sortBy || 'price';  // Default sort by price
  const order = searchParams.order || 'asc';  // Default order

  try {
    const products = await fetchProducts({ page, limit: 20, search, category, sortBy, order }); // Fetch products from the API
    return (
      <div>
        <ProductGrid products={products} searchParams={searchParams} /> {/* Display products in a grid */}
        <Pagination currentPage={page} search={search} category={category} sortBy={sortBy} order={order} /> {/* Display pagination controls */}
      </div>
    );
  } catch (err) {
    // Handle errors (displaying a message or redirecting)
    console.error(err);  // Log error for debugging
    throw err; // Show 404 page if data fetching fails
  }
}
