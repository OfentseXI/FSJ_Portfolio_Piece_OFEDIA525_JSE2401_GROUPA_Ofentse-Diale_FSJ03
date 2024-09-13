import { useEffect, useState } from 'react';

export default function ErrorPage({ message }) {
  const [firstError, setFirstError] = useState(true); // State to track if it's the first error

  // Run this only once to check if it's the first error
  useEffect(() => {
    const errorOccurredBefore = sessionStorage.getItem('errorOccurred');
    if (errorOccurredBefore) {
      setFirstError(false); // If an error has occurred before, hide the "Try Again" button
    } else {
      sessionStorage.setItem('errorOccurred', 'true'); // Set the error occurrence
    }
  }, []);

  const handleTryAgain = () => {
    window.location.reload(); // Reload the page to try fetching the data again
  };

  const handleBack = () => {
    window.history.back(); // Go back to the previous page
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center bg-gray-50 p-6">
      <h1 className="text-4xl font-bold text-red-500 mb-4">Oops! Something went wrong 😵</h1>
      <p className="text-lg text-gray-700 mb-6">{message || "We couldn't fetch the products."}</p>
      
      <img
        className="w-64 mb-6"
        src="https://media.giphy.com/media/l4FGuhL4U2WyjdkaY/giphy.gif"
        alt="Error gif"
      />
      
      {/* Back to Previous Page Button */}
      <button
        onClick={handleBack}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mb-4"
      >
        Back to Previous Page
      </button>

      {/* Try Again Button (Visible only if it's the first error) */}
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
