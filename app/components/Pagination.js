import Link from 'next/link';
import { useState } from 'react';

export default function Pagination({ currentPage }) {
  const [showPrevTooltip, setShowPrevTooltip] = useState(false);
  const [showNextTooltip, setShowNextTooltip] = useState(false);

  return (
    <div className="flex justify-center my-6">
      {/* Previous Link */}
      <div className="relative flex items-center">
        <Link
          href={`/?page=${currentPage - 1}`}
          className={`mr-4 px-4 py-2 transition-colors duration-200 ${
            currentPage <= 1
              ? 'text-gray-400 cursor-not-allowed'
              : 'text-blue-600 hover:text-blue-800'
          }`}
          onMouseEnter={() => setShowPrevTooltip(true)}
          onMouseLeave={() => setShowPrevTooltip(false)}
          disabled={currentPage <= 1}
        >
          {/* Left Arrow Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        {/* Tooltip for "Previous" */}
        {showPrevTooltip && currentPage > 1 && (
          <div className="absolute left-0 bottom-full mb-2 px-2 py-1 bg-gray-700 text-white text-sm rounded-md shadow-lg">
            Previous
          </div>
        )}
      </div>

      {/* Current Page Indicator */}
      <span className="mx-4 px-4 py-2 text-gray-900 bg-gray-200 rounded-md">Page {currentPage}</span>

      {/* Next Link */}
      <div className="relative flex items-center">
        <Link
          href={`/?page=${currentPage + 1}`}
          className="px-4 py-2 text-blue-600 hover:text-blue-800 transition-colors duration-200"
          onMouseEnter={() => setShowNextTooltip(true)}
          onMouseLeave={() => setShowNextTooltip(false)}
        >
          {/* Right Arrow Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </Link>
        {/* Tooltip for "Next" */}
        {showNextTooltip && (
          <div className="absolute left-0 bottom-full mb-2 px-2 py-1 bg-gray-700 text-white text-sm rounded-md shadow-lg">
            Next
          </div>
        )}
      </div>
    </div>
  );
}