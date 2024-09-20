import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="bg-gray-900 text-white h-screen flex flex-col justify-center items-center">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <h2 className="text-2xl mb-6">Oops! Page not found.</h2>
      <p className="text-gray-400 mb-8 text-center">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link href="/" className="bg-indigo-600 text-white px-4 py-3 rounded-md text-lg hover:bg-indigo-500 transition">
          Back to Home
      </Link>
    </div>
  );
}