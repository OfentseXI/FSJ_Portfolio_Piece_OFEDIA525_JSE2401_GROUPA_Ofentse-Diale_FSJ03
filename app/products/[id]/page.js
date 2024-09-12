"use client";

import { useState, useEffect } from 'react';
import Loading from '../loading';
import ErrorPage from '@/app/components/ErrorPage';
import Link from 'next/link';

async function fetchProductDetails(id) {
  const response = await fetch(`https://next-ecommerce-api.vercel.app/products/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch product details');
  }
  return response.json();
}

export default function ProductDetails({ params }) {
  const { id } = params;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reviewsVisible, setReviewsVisible] = useState(false);

  useEffect(() => {
    const loadProductDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const productData = await fetchProductDetails(id);
        setProduct(productData);
      } catch (err) {
        setError('Failed to load product details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    loadProductDetails();
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorPage message={error} />;
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6 sm:p-10">
            <div className="flex flex-col lg:flex-row gap-10">
              <div className="flex-1">
                <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg">
                  <img
                    className="object-cover object-center w-full h-full"
                    src={product.images[0]}
                    alt={product.title}
                  />
                </div>
                {product.images.length > 1 && (
                  <div className="grid grid-cols-4 gap-2 mt-4">
                    {product.images.map((image, index) => (
                      <img key={index} className="w-full h-24 object-cover rounded-md" src={image} alt={`Image ${index + 1}`} />
                    ))}
                  </div>
                )}
              </div>

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
                  <span className="text-gray-600 ml-2">({product.rating?.rate})</span>
                </div>
                <p className="text-sm text-gray-600 mt-2">Stock: {product.stock}</p>

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

            <div className="mt-10">
              <h2 className="text-2xl font-bold text-gray-900">Reviews</h2>
              <button
                className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition-colors duration-200"
                onClick={() => setReviewsVisible(!reviewsVisible)}
              >
                {reviewsVisible ? 'Hide Reviews' : 'Show Reviews'}
              </button>

              {reviewsVisible && (
                <div className="mt-6 space-y-6">
                  {product.reviews?.length > 0 ? (
                    product.reviews.map((review, index) => (
                      <div key={index} className="bg-gray-50 p-6 rounded-lg">
                        <p className="font-semibold text-gray-900">{review.reviewerName}</p>
                        <p className="text-gray-600 text-sm">
                          {new Date(review.date).toLocaleDateString()}
                        </p>
                        <p className="mt-2 text-gray-700">{review.comment}</p>
                        <div className="text-yellow-400 mt-2">
                          {Array(Math.round(review.rating || 0)).fill('★').join('')}
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-700">No reviews yet.</p>
                  )}
                </div>
              )}
            </div>

            <div className="mt-10">
              <Link href="/" className="text-indigo-600 hover:text-indigo-800 font-medium">
                ← Back to Products
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}