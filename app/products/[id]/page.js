"use client";

import { useState, useEffect } from 'react';
import Loading from '../loading'; // Use the global loading spinner
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

  useEffect(() => {
    const loadProductDetails = async () => {
      setLoading(true); // Set loading to true while fetching
      setError(null);
      try {
        const productData = await fetchProductDetails(id);
        setProduct(productData);
      } catch (err) {
        setError('Failed to load product details. Please try again later.');
      } finally {
        setLoading(false); // Disable loading after fetching
      }
    };
    loadProductDetails();
  }, [id]);

  if (loading) {
    return <Loading />; // Use the global loading spinner while data is being fetched
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="max-w-screen-lg mx-auto p-6">
      {/* Display product details */}
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          <img
            className="object-contain h-64"
            src={product.images[0]}
            alt={product.title}
          />
          {product.images.length > 1 && (
            <div className="flex gap-2 mt-4">
              {product.images.map((image, index) => (
                <img key={index} className="w-16 h-16 object-contain" src={image} alt={`Image ${index + 1}`} />
              ))}
            </div>
          )}
        </div>

        <div className="flex-1">
          <h1 className="text-3xl font-bold">{product.title}</h1>
          <p className="text-xl mt-2">${product.price}</p>
          <p className="text-gray-700 mt-2">Category: {product.category}</p>
          <p className="mt-4">{product.description}</p>
          <div className="flex items-center mt-4">
            <span className="text-yellow-500">
              {Array(Math.round(product.rating?.rate || 0)).fill('⭐').join('')}
            </span>
            <span className="text-gray-500 ml-2">({product.rating?.rate})</span>
          </div>
          <p className="text-sm text-gray-500 mt-2">Stock: {product.stock}</p>

          <div className="mt-6">
            <h2 className="text-lg font-bold">Tags:</h2>
            <div className="flex gap-2 mt-2">
              {product.tags?.map((tag, index) => (
                <span
                  key={index}
                  className="inline-block bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-2xl font-bold">Reviews</h2>
        {product.reviews?.length > 0 ? (
          product.reviews.map((review, index) => (
            <div key={index} className="mt-4 p-4 border border-gray-200 rounded">
              <p className="font-bold">{review.user}</p>
              <p className="text-gray-600 text-sm">
                {new Date(review.date).toLocaleDateString()}
              </p>
              <p>{review.comment}</p>
              <div className="text-yellow-500 mt-1">
                {Array(Math.round(review.rating || 0)).fill('⭐').join('')}
              </div>
            </div>
          ))
        ) : (
          <p className="mt-4">No reviews yet.</p>
        )}
      </div>

      <div className="mt-6">
        <Link href="/" className="text-blue-600 hover:text-blue-800">Back to Products</Link>
      </div>
    </div>
  );
}
