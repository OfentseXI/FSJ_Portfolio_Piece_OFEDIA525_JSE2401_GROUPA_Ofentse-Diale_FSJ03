"use client";
import { useState, useEffect } from 'react';
import { fetchProducts } from '../api/products/route';

/**
 * Pagination and Product Fetching Component.
 */
export default function ProductList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [lastVisible, setLastVisible] = useState(null); // Track last product
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [sortBy, setSortBy] = useState('price');
  const [order, setOrder] = useState('asc');

  useEffect(() => {
    const loadProducts = async () => {
      const { products: fetchedProducts, lastVisibleProduct } = await fetchProducts({
        page: currentPage,
        limit: 20,
        search,
        category,
        sortBy,
        order,
        lastVisible,
      });
      
      setProducts(fetchedProducts);
      setLastVisible(lastVisibleProduct);
    };

    loadProducts();
  }, [currentPage, search, category, sortBy, order]);

  const handleNextPage = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };

  return (
    <div>
      <div className="search-filter">
        {/* Add your search/filter inputs here */}
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products..."
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">All Categories</option>
          {/* Add more categories here */}
        </select>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="price">Price</option>
          {/* Add more sorting options here */}
        </select>
        <select value={order} onChange={(e) => setOrder(e.target.value)}>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

      <div className="product-grid">
        {/* Render your products here */}
        {products.map(product => (
          <div key={product.id} className="product-card">
            {/* Product details */}
            <p>{product.name}</p>
            <p>{product.price}</p>
          </div>
        ))}
      </div>

      <div className="pagination-controls">
        <button onClick={handlePreviousPage} disabled={currentPage <= 1}>
          Previous
        </button>
        <span>Page {currentPage}</span>
        <button onClick={handleNextPage}>
          Next
        </button>
      </div>
    </div>
  );
}
