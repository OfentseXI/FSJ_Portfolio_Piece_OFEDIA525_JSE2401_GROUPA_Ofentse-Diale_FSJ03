import ProductGrid from './components/ProductGrid';
import Pagination from './components/Pagination';
// import { fetchProducts } from './api/products/route';

export const metadata = {
  title: 'MyStore',
  description: 'The store for me, you, and everyone else!',
};

export async function fetchProducts() {

  const res = await fetch(
    `http://localhost:3000/api/products?${queryParams.toString()}`,
    {
      cache: "force-cache",
      next: { revalidate: 1800 },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch products.");
  }

  return res.json();
}


export default async function ProductsPage({ searchParams }) {
  const page = searchParams.page ? parseInt(searchParams.page, 10) : 1;
  const search = searchParams.search || '';
  const category = searchParams.category || '';
  const sortBy = searchParams.sortBy || 'price';
  const order = searchParams.order || 'asc';

  try {
    const products = await fetchProducts({ page, search, category, sortBy, order });

    return (
      <div>
        <ProductGrid products={products} searchParams={searchParams} />
        <Pagination currentPage={page} search={search} category={category} sortBy={sortBy} order={order} />
      </div>
    );
  } catch (err) {
    console.error('Error fetching products:', err);
    return <div>Error loading products. Please try again later.</div>;
  }
}