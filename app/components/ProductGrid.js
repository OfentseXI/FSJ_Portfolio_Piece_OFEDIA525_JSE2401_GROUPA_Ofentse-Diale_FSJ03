"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { collection, getDocs } from "firebase/firestore"; 
import { db } from "../api/products/firebaseConfig"; 

export default function ProductGrid({ products, searchParams }) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState(searchParams.search || '');
  const [sortOption, setSortOption] = useState(searchParams.sortBy || '');
  const [categoryFilter, setCategoryFilter] = useState(searchParams.category || '');
  const [categories, setCategories] = useState([]);
  const [hasFilters, setHasFilters] = useState(false);

  // Function to fetch categories from Firestore
  async function fetchCategories() {
    const categoriesCollection = collection(db, 'categories');
    const categorySnapshot = await getDocs(categoriesCollection);
    const categoryList = categorySnapshot.docs.map(doc => doc.data().name); // Assuming categories have a 'name' field
    return categoryList;
  }

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams);
    if (searchTerm) {
      params.set("search", searchTerm);
    } else {
      params.delete("search");
    }
    params.set("page", "1");
    router.push(`/?${params.toString()}`);
  };

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

  useEffect(() => {
    const isFiltered = sortOption || categoryFilter;
    setHasFilters(!!isFiltered);
    handleFilterSort();
  }, [categoryFilter, sortOption]);

  const handleReset = () => {
    setSortOption('');
    setCategoryFilter('');
    const params = new URLSearchParams();
    params.set("page", "1");
    router.push(`/?${params.toString()}`);
  };

  return (
    <div className="bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 flex flex-col sm:flex-row justify-between space-y-4 sm:space-y-0">
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          {/* Removed debounce logic, now search triggers onChange directly */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch();
            }}
          >
            <input
              type="text"
              placeholder="Search..."
              className="p-2 w-full sm:w-auto border border-gray-300 rounded text-gray-700"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} // Direct change here
            />
          </form>
          <select
            className="p-2 border-2 border-gray-300 rounded text-black w-full sm:w-auto"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="">Default Sort</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
          <select
            className="p-2 border-2 border-gray-300 rounded text-black w-full sm:w-auto"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>
        {hasFilters && (
          <button
            className="p-2 bg-red-500 text-white rounded shadow hover:bg-red-600 transition w-full sm:w-auto"
            onClick={handleReset}
          >
            Reset Filters
          </button>
        )}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
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
      <Link href={`/products/${product.id}`} className="relative w-full h-56 sm:h-64 md:h-72 flex items-center justify-center bg-gray-100">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
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
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white p-1 md:p-2 rounded-full shadow-lg hover:bg-gray-100 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-4 h-4 md:w-6 md:h-6 text-gray-800"
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
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white p-1 md:p-2 rounded-full shadow-lg hover:bg-gray-100 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-4 h-4 md:w-6 md:h-6 text-gray-800"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 19.5l7.5-7.5-7.5-7.5"
              />
            </svg>
          </button>
        </>
      )}

      <div className="p-4">
        <Link href={`/products/${product.id}`} className="block text-gray-800 font-semibold mb-2">
          {product.title}
        </Link>
        <p className="text-gray-600 mb-2">{product.price}</p>
        <button className="text-indigo-600 hover:text-indigo-800 font-medium">
          Add to Cart
        </button>
      </div>
    </div>
  );
}
