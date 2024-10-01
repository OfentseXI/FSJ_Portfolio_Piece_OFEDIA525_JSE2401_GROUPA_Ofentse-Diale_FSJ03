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
async function fetchProducts({ 
  page = 1, 
  limit = 20, 
  search = '', 
  category = '', 
  sortBy = 'id', 
  order = 'asc' 
  } = {}) {
  
  
  const skip = (page - 1) * limit;

  // Build individual query strings
  const limitQuery = `limit=${limit}`;
  const skipQuery = `skip=${skip}`;
  const sortByQuery = `sortBy=${sortBy}`;
  const orderQuery = `order=${order}`;
  const searchQuery = search ? `search=${encodeURIComponent(search)}` : '';
  const categoryQuery = category ? `category=${encodeURIComponent(category)}` : '';

  // Combine the query strings into a single string
  const queryString = [limitQuery, skipQuery, sortByQuery, orderQuery, searchQuery, categoryQuery]
    .filter(Boolean)
    .join('&');

  const response = await fetch(`https://next-ecommerce-api.vercel.app/products?${queryString}`);
  
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
  const search = searchParams.search || '';  // Handle search parameter
  const category = searchParams.category || '';  // Handle category parameter
  const sortBy = searchParams.sortBy || '';  // Handle sort parameter
  const order = searchParams.order || '';  // Handle order parameter

  try {
    const products = await fetchProducts({ page, search, category, sortBy, order }); // Fetch products on the server
    return (
      <div>
        <ProductGrid products={products} searchParams={searchParams}  /> {/* Display products in a grid */}
        <Pagination currentPage={page} search={search} category={category} sortBy={sortBy} order={order}/> {/* Display pagination controls */}
      </div>
    );
  } catch (err) {
    // Handle errors (displaying a message or redirecting)
    throw err; // Show 404 page if data fetching fails
  }
}
