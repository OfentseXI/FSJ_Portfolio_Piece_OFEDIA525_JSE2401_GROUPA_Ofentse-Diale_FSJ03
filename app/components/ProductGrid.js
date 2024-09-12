import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ProductGrid({ products }) {
  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ProductCard({ product }) {
  const [isLoading, setIsLoading] = useState(true); // State to manage image loading
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // State to track the current image
  const [isHovered, setIsHovered] = useState(false); // State to track hover

  // Effect to cycle through images on hover
  useEffect(() => {
    let interval;
    if (isHovered && product.images.length > 1) {
      interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) =>
          prevIndex === product.images.length - 1 ? 0 : prevIndex + 1
        );
      }, 2000); // Change image every 2 seconds
    } else {
      setCurrentImageIndex(0); // Reset to the first image when not hovered
    }
    return () => {
      clearInterval(interval);
    };
  }, [isHovered, product.images]);

  return (
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative w-full h-64 flex items-center justify-center bg-gray-100">
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
          className={`object-cover w-full h-full transition-all duration-700 ease-in-out transform ${
            isLoading ? 'opacity-0' : 'opacity-100'
          }`}
          onLoad={() => setIsLoading(false)} // Hide spinner when image is loaded
        />
      </div>
      <div className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {product.title}
        </h2>
        <p className="text-xl font-bold text-indigo-600 mb-4">${product.price}</p>
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center rounded-full bg-indigo-100 px-3 py-0.5 text-sm font-medium text-indigo-800">
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
