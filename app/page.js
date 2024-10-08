import ProductGrid from './components/ProductGrid';
import Pagination from './components/Pagination';
import { fetchProducts } from './api/products/route'; // Import the updated fetchProducts function

export const metadata = {
  title: 'MyStore',
  description: 'The store for me, you, and everyone else!',
};

export default async function ProductsPage({ searchParams }) {
  const page = searchParams.page ? parseInt(searchParams.page, 10) : 1;
  const search = searchParams.search || '';  // Handle search parameter
  const category = searchParams.category || '';  // Handle category parameter
  const sortBy = searchParams.sortBy || 'id';  // Handle sort parameter
  const order = searchParams.order || 'asc';  // Handle order parameter

  try {
    // Fetch products from Firestore
    const products = await fetchProducts({ page, search, category, sortBy, order });

    return (
      <div>
        <ProductGrid products={products} searchParams={searchParams} /> {/* Display products in a grid */}
        <Pagination currentPage={page} search={search} category={category} sortBy={sortBy} order={order} /> {/* Display pagination controls */}
      </div>
    );
  } catch (err) {
    // Handle errors (displaying a message or redirecting)
    throw err; // Show 404 page if data fetching fails
  }
}
