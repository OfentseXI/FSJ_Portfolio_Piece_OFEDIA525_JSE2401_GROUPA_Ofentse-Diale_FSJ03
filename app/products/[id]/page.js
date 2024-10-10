"use client";

import { useState, useEffect } from 'react';
import Loading from '@/app/loading';
import Link from 'next/link';
import ErrorPage from '@/app/error';

export default function ProductDetails({ params }) {
  const { id } = params;
  const paddedId = id.toString().padStart(3,"0");
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [reviewsVisible, setReviewsVisible] = useState(false);
  const [sortBy, setSortBy] = useState('');
  const [sortOrder, setSortOrder] = useState('');

  // Function to fetch product by ID (integrated directly here)
  async function fetchProductById(id) {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    try {
      const response = await fetch(`${baseUrl}/api/products/${id}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const productData = await response.json();
      return productData;
    } catch (error) {
      console.error('Error fetching product:', error);
      throw error;
    }
  }

  useEffect(() => {
    const loadProductDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const productData = await fetchProductById(paddedId); // Use the integrated fetch function here
        setProduct(productData);
      } catch (err) {
        setError('Failed to load product details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadProductDetails();
  }, [paddedId]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorPage message={error} />;
  }
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

  // Handle sort change
  const handleSortChange = (sortField, order) => {
    setSortBy(sortField);
    setSortOrder(order);
  };

  // Handle reset filters
  const resetFilters = () => {
    setSortBy('');
    setSortOrder('');
  };

  // Sort reviews based on selected criteria
  const sortedReviews = () => {
    if (!product.reviews || product.reviews.length === 0) return [];

    return [...product.reviews].sort((a, b) => {
      if (sortBy === 'date') {
        return sortOrder === 'asc'
          ? new Date(a.date) - new Date(b.date)
          : new Date(b.date) - new Date(a.date);
      }
      if (sortBy === 'rating') {
        return sortOrder === 'asc'
          ? a.rating - b.rating
          : b.rating - a.rating;
      }
      return 0; // No sorting if no criteria is selected
    });
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6 sm:p-10">
            <div className="flex flex-col lg:flex-row gap-10">
              {/* Image Section */}
              <div className="flex-1 relative">
                <div className="relative w-full h-[400px] overflow-hidden rounded-lg bg-gray-100">
                  <span
                    className={`absolute top-2 left-2 px-3 py-1 text-m text-white rounded-md ${
                      product.stock > 0 ? "bg-indigo-600" : "bg-red-500"
                    }`}
                  >
                    {product.stock > 0 ? "In Stock" : "Out of Stock"}
                  </span>
                  <img
                    className="object-contain w-full h-full"
                    src={product.images[currentImageIndex]}
                    alt={product.title}
                  />
                  <button
                    onClick={handlePreviousImage}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition"
                  >
                    {/* Left Arrow SVG */}
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
                    {/* Right Arrow SVG */}
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
                </div>

                {product.images.length > 1 && (
                  <div className="grid grid-cols-4 gap-2 mt-4">
                    {product.images.map((image, index) => (
                      <div
                        key={index}
                        className={`cursor-pointer p-1 border rounded-md ${
                          index === currentImageIndex
                            ? 'border-indigo-600'
                            : 'border-transparent'
                        }`}
                        onClick={() => setCurrentImageIndex(index)}
                      >
                        <img
                          className="w-full h-24 object-contain"
                          src={image}
                          alt={`Image ${index + 1}`}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Product Info Section */}
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>
                <p className="text-2xl font-bold text-indigo-600 mt-2">${product.price}</p>
                <span className="inline-flex items-center rounded-full bg-indigo-100 px-3 py-0.5 text-sm font-medium text-indigo-800 mt-2">
                  {product.category}
                </span>
                <p className="text-gray-700 mt-4">{product.description}</p>
                <div className="flex items-center mt-4">
                  <span className="text-yellow-400">
                    {Array(Math.round(product.rating?.rate || 0)).fill('★').join('')}
                  </span>
                  <span className="text-gray-600">Rated: {product.rating} out of 5</span>
                </div>
                <p className="text-gray-600 mt-2">Stock: {product.stock}</p>

                <div className="mt-6">
                  <h2 className="text-lg font-semibold text-gray-900">Tags:</h2>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {product.tags?.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-block bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Reviews Section */}
            <div className="mt-10">
              <h2 className="text-2xl font-bold text-gray-900">Reviews</h2>
              <button
                className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition-colors duration-200"
                onClick={() => setReviewsVisible(!reviewsVisible)}
              >
                {reviewsVisible ? 'Hide Reviews' : 'Show Reviews'}
              </button>

              {reviewsVisible && (
                <>
                  {/* Sort buttons */}
                  <div className="mt-4 flex gap-4">
                    {/* Sort by Date */}
                    <div>
                      <p className="text-gray-700 mb-2 font-semibold">Sort by Date:</p>
                      <button
                        onClick={() => handleSortChange('date', 'desc')}
                        className={`bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors text-black${
                          sortBy === 'date' && sortOrder === 'desc' ? 'bg-gray-400' : ''
                        }`}
                      >
                        Newest
                      </button>
                      <button
                        onClick={() => handleSortChange('date', 'asc')}
                        className={`bg-gray-200 px-4 py-2 ml-2 rounded-lg hover:bg-gray-300 transition-colors text-black${
                          sortBy === 'date' && sortOrder === 'asc' ? 'bg-gray-400' : ''
                        }`}
                      >
                        Oldest
                      </button>
                    </div>
                    {/* Sort by Rating */}
                    <div>
                      <p className="text-gray-700 mb-2 font-semibold">Sort by Rating:</p>
                      <button
                        onClick={() => handleSortChange('rating', 'desc')}
                        className={`bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors text-black${
                          sortBy === 'rating' && sortOrder === 'desc' ? 'bg-gray-400' : ''
                        }`}
                      >
                        Highest
                      </button>
                      <button
                        onClick={() => handleSortChange('rating', 'asc')}
                        className={`bg-gray-200 px-4 py-2 ml-2 rounded-lg hover:bg-gray-300 transition-colors text-black${
                          sortBy === 'rating' && sortOrder === 'asc' ? 'bg-gray-400' : ''
                        }`}
                      >
                        Lowest
                      </button>
                      <button
                          onClick={resetFilters}
                          className="ml-5 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                        >
                          Reset Filters
                    </button>
                    </div>
                  </div>

                  {/* Display reviews */}
                  <div className="mt-4 bg-gray-200 p-4 rounded-lg">
                    {sortedReviews().map((review) => (
                      <div
                        key={review.id}
                        className="bg-gray-100 p-4 rounded-md mb-4 shadow-md"
                      >
                        <div className="flex items-center mb-2">
                          <p className="font-bold text-gray-900">{review.reviewerName}</p>
                          <span className="ml-auto text-yellow-400">
                            {Array(Math.round(review.rating)).fill('★').join('')}
                          </span>
                        </div>
                        <p className="text-gray-700">{review.comment}</p>
                        <p className="text-gray-500 text-sm mt-2">{new Date(review.date).toLocaleDateString()}</p>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
             {/* Back to Products Button */}
             <Link href="/" className="mt-6 inline-block text-indigo-600 hover:text-indigo-800">
                    &larr; Back to Products
              </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
