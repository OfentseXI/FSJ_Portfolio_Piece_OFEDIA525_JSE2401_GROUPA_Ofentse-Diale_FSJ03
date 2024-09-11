import Link from 'next/link';

export default function Pagination({ currentPage }) {
  return (
    <div className="flex justify-center my-6">
      <Link
        href={`/?page=${currentPage - 1}`}
        className={`mr-4 px-4 py-2 ${currentPage <= 1 ? 'text-gray-500 cursor-not-allowed' : 'text-blue-600 hover:text-blue-800'}`}
        disabled={currentPage <= 1}
      >
        Previous
      </Link>
      <span className="mx-4 px-4 py-2">Page {currentPage}</span>
      <Link
        href={`/?page=${currentPage + 1}`}
        className="px-4 py-2 text-blue-600 hover:text-blue-800"
      >
        Next
      </Link>
    </div>
  );
}