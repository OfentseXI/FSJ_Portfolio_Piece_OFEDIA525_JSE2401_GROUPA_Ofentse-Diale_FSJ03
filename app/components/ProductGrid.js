"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function ProductGrid({ products, searchParams }) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState(searchParams.search || '');
  const [sortOption, setSortOption] = useState(searchParams.sortBy || '');
  const [categoryFilter, setCategoryFilter] = useState(searchParams.category || '');
  const [categories, setCategories] = useState([]); // State to store categories
  const [hasFilters, setHasFilters] = useState(false); // Track if filters or sort are applied

  /**
   * Fetch categories from the API.
   *
   * @returns {Promise<string[]>} A promise that resolves to an array of category names.
   * @throws {Error} Throws an error if the fetch request fails.
   */
  async function fetchCategories() {
    const response = await fetch('http://localhost:3000/api/categories');
    
    if (!response.ok) {
      throw new Error('Failed to fetch categories');
    }
    
    const data = await response.json();
    return data[0].categories; // Extract the categories array from the response
  }

  // Function to handle search
  const handleSearch = () => {
    const params = new URLSearchParams(searchParams);
    if (searchTerm) {
      params.set("search", searchTerm);
    } else {
      params.delete("search");
    }
    params.set("page", "1");  // Reset to first page after search
    router.push(`/?${params.toString()}`);
  };

  // Fetch categories on component mount
  useEffect(() => {
    async function loadCategories() {
      try {
        const fetchedCategories = await fetchCategories();
        setCategories(fetchedCategories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    }
    loadCategories();
  }, []);

  // Function to handle sorting and filtering
  const handleFilterSort = () => {
    const params = new URLSearchParams(searchParams);
    if (categoryFilter) {
      params.set("category", categoryFilter);
    } else {
      params.delete("category");
    }
    if (sortOption) {
      const [sortBy, order] = sortOption.split("-");
      params.set("sortBy", sortBy);
      params.set("order", order);
    } else {
      params.delete("sortBy");
      params.delete("order");
    }
    router.push(`/?${params.toString()}`);
  };

  // Update the hasFilters state when filters or sort options change
  useEffect(() => {
    const isFiltered = sortOption || categoryFilter;
    setHasFilters(!!isFiltered); // Set to true if any option is active
    handleFilterSort();
  }, [categoryFilter, sortOption]);

  // Function to reset filters and sort
  const handleReset = () => {
    setSortOption('');
    setCategoryFilter('');
    const params = new URLSearchParams();
    params.set("page", "1");  // Reset to the first page
    router.push(`/?${params.toString()}`);
  };

  return (
    <div className="bg-gray-50 py-12">
      {/* Search, Sort, and Filter Controls */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 flex justify-between">
        <div className="flex space-x-4">
          <form
            onChange={(e) => {
              e.preventDefault();
              handleSearch();
            }}
          >
            <input
              type="text"
              placeholder="Search..."
              className="p-2 border border-gray-300 rounded text-gray-700"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </form>
          <select
            className="p-2 border-2 border-gray-300 rounded text-black"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="">Default Sort</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
          <select
            className="p-2 border-2 border-gray-300 rounded text-black"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {typeof category === 'string'
                  ? category.charAt(0).toUpperCase() + category.slice(1)
                  : category}
              </option>
            ))}
          </select>
        </div>
        {/* Reset Button */}
        {hasFilters && (
          <button
            className="p-2 bg-red-500 text-white rounded shadow hover:bg-red-600 transition"
            onClick={handleReset}
          >
            Reset Filters
          </button>
        )}
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <p>No products found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

function ProductCard({ product }) {
  const [isLoading, setIsLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === product.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePreviousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? product.images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/products/${product.id}`} className="relative w-full h-64 flex items-center justify-center bg-gray-100">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Loading spinner */}
            <svg
              className="animate-spin h-8 w-8 text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>
        )}

        <img
          src={product.images[currentImageIndex]}
          alt={product.title}
          className={`object-contain w-full h-full transition-all duration-700 ease-in-out transform ${isLoading ? 'opacity-0' : 'opacity-100'}`}
          onLoad={() => setIsLoading(false)}
        />
      </Link>

      {isHovered && product.images.length > 1 && (
        <>
          <button
            onClick={handlePreviousImage}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6 text-gray-800"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </button>

          <button
            onClick={handleNextImage}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6 text-gray-800"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
        </>
      )}

      <div className="p-6">
        <Link href={`/products/${product.id}`}>
          <h2 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
            {product.title}
          </h2>
        </Link>
        <p className="text-xl font-bold text-indigo-600 mb-4">${product.price}</p>
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center rounded bg-indigo-100 px-3 py-0.5 text-sm font-medium text-indigo-800">
            {product.category}
          </span>
          <Link
            href={`/products/${product.id}`}
            className="text-sm font-medium text-indigo-600 hover:text-indigo-500 transition-colors duration-200"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}