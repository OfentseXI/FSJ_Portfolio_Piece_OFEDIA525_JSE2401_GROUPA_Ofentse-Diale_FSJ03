import ProductGrid from './components/ProductGrid';
import Pagination from './components/Pagination';

export const metadata = {
  title: 'MyStore',
  description: 'The store for me, you and everyone else!',
};

async function fetchProducts({
  page = 1,
  limit = 20,
  search = '',
  category = '',
  sortBy = 'id',
  order = 'asc'
} = {}) {
  // Use an absolute URL
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
  const apiUrl = `${baseUrl}/api/products?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}&category=${encodeURIComponent(category)}&sortBy=${sortBy}&order=${order}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorData.error}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    throw new Error(`Failed to fetch products: ${error.message}`);
  }
}

export default async function Home({ searchParams }) {
  const page = parseInt(searchParams.page) || 1;
  const limit = 20; // You can adjust this value
  const search = searchParams.search || '';
  const category = searchParams.category || '';
  const sortBy = searchParams.sortBy || 'id';
  const order = searchParams.order || 'asc';

  try {
    const { products, totalProducts, totalPages } = await fetchProducts({
      page,
      limit,
      search,
      category,
      sortBy,
      order
    });

    return (
      <main>
        <ProductGrid
          products={products}
          searchParams={searchParams}
        />
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          totalProducts={totalProducts}
          limit={limit}
          search={search}
          category={category}
          sortBy={sortBy}
          order={order}
        />
      </main>
    );
  } catch (error) {
    throw error
  }
}