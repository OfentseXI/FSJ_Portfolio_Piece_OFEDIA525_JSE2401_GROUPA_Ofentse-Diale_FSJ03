"use client";
import { useEffect, useState } from 'react';
import Image from 'next/image';

/**
 * ErrorPage component to display an error message and provide options to either try again or go back.
 *
 * @param {Object} props - The component props.
 * @param {string} props.message - The error message to display.
 * @returns {JSX.Element} The rendered component.
 */
export default function ErrorPage({ message }) {
  const [firstError, setFirstError] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const errorOccurredBefore = sessionStorage.getItem('errorOccurred');
      if (errorOccurredBefore) {
        setFirstError(false);
      } else {
        sessionStorage.setItem('errorOccurred', 'true');
      }
    }
  }, []);

  const handleTryAgain = () => {
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  };

  const handleBackToHome = () => {
    if (typeof window !== 'undefined') {
      window.location.href = '/';
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center bg-gray-50 p-6">
      <h1 className="text-4xl font-bold text-red-500 mb-4">Oops! Something went wrong 😵</h1>
      <p className="text-lg text-gray-700 mb-6">{message || "We couldn't fetch the products."}</p>
      
      <div className="w-64 h-64 relative mb-6">
        <Image
          src="/api/placeholder/256/256"
          alt="Error gif"
          layout="fill"
          objectFit="contain"
        />
      </div>
      
      <button 
        onClick={handleBackToHome}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mb-4"
      >
        Back to Home Page
      </button>

      {firstError && (
        <button
          onClick={handleTryAgain}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
        >
          Try Again
        </button>
      )}
    </div>
  );
}