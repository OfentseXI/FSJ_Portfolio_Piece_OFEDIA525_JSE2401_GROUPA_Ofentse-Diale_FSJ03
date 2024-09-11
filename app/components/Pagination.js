"use client";
import { useRouter } from 'next/navigation';

function Pagination({ currentPage }) {
  const router = useRouter();

  const handleNextPage = () => {
    router.push(`/products?page=${currentPage + 1}`);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      router.push(`/products?page=${currentPage - 1}`);
    }
  };

  return (
    <div>
      <button onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
      <span>Page {currentPage}</span>
      <button onClick={handleNextPage}>Next</button>
    </div>
  );
}

export default Pagination;