async function fetchProducts(page = 1, limit = 20) {
    const skip = (page - 1) * limit;
    const response = await fetch(`https://next-ecommerce-api.vercel.app/products?limit=${limit}&skip=${skip}`);
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    return response.json();
  }
  
  import ProductGrid from '../components/ProductGrid';
  import Pagination from '../components/Pagination';
  
  export default async function ProductsPage({ searchParams }) {
    const page = searchParams.page ? parseInt(searchParams.page, 10) : 1;
  
    let products;
    try {
      products = await fetchProducts(page);
    } catch (error) {
      return <div>Failed to load products. Please try again later.</div>;
    }
  
    return (
      <div>
        <ProductGrid products={products} />
        <Pagination currentPage={page} />
      </div>
    );
  }