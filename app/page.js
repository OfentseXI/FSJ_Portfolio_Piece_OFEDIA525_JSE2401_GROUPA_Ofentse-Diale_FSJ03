import ProductGrid from './components/ProductGrid';
import Pagination from './components/Pagination';

/**
 * Fetch products from the API with pagination, search, category filtering, and sorting.
 *
 * @param {Object} params - Parameters for fetching products.
 * @param {number} params.page - The page number for pagination.
 * @param {number} params.limit - The number of products to fetch per page.
 * @param {string} params.search - The search term for filtering products.
 * @param {string} params.category - The category to filter products by.
 * @param {string} params.sortBy - The field to sort the products by.
 * @param {string} params.order - The order of sorting (asc or desc).
 * @returns {Promise<Object[]>} A promise that resolves to the array of products.
 */
async function fetchProducts({
  page = 1,
  limit = 20,
  search = '',
  category = '',
  sortBy = 'id',
  order = 'asc'
  } = {}) {


   // Build individual query strings
   const limitQuery = `limit=${limit}`;
   const sortByQuery = `sortBy=${sortBy}`;
   const orderQuery = `order=${order}`;
   const searchQuery = search ? `search=${encodeURIComponent(search)}` : '';
   const categoryQuery = category ? `category=${encodeURIComponent(category)}` : '';
 
   // Combine the query strings into a single string
   const queryString = [limitQuery, sortByQuery, orderQuery, searchQuery, categoryQuery]
     .filter(Boolean)
     .join('&');

  const response = await fetch(`http://localhost:3000/api/products?${queryString}`);

  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }

  const { products } = await response.json();
  return products; // Return only the array of products
  }

  export default async function ProductsPage({ searchParams }) {
    const page = searchParams.page ? parseInt(searchParams.page, 10) : 1;
    const search = searchParams.search || '';  // Handle search parameter
    const category = searchParams.category || '';  // Handle category parameter
    const sortBy = searchParams.sortBy || '';  // Handle sort parameter
    const order = searchParams.order || '';  // Handle order parameter

  try {
    const products = await fetchProducts({ page:parseInt(page, 10), search, category, sortBy, order});

    return (
      <div>
        <ProductGrid products={products} searchParams={searchParams} />
        <Pagination
          currentPage={parseInt(page, 10)}
          search={search}
          category={category}
          sortBy={sortBy}
          order={order}
        />
      </div>
    );
  } catch (err) {
    // Handle errors (displaying a message or redirecting)
    throw err; // Show 404 page if data fetching fails
  }
}