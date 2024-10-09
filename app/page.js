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
  sortBy = 'price',
  order = 'asc'
} = {}) {
  const queryParams = new URLSearchParams({
    limit,
    page,
    sortBy,
    order,
    ...(search && { search }),
    ...(category && { category })
  });

  const response = await fetch(`http://localhost:3000/api/products?${queryParams}`);

  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }

  const { products } = await response.json();
  return products; // Return only the array of products
}

export default async function ProductsPage({ searchParams }) {
  // Destructure searchParams with defaults
  const {
    page = 1,
    search = '',
    category = '',
    sortBy = 'price',
    order = 'asc'
  } = searchParams;

  try {
    const products = await fetchProducts({
      page: parseInt(page, 10),
      limit: 20,
      search,
      category,
      sortBy,
      order
    });

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
    console.error(err);
    return <div>Error loading products...</div>;
  }
}