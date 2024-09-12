import Link from 'next/link';

export default function ErrorPage({ message }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center bg-gray-50 p-6">
      <h1 className="text-4xl font-bold text-red-500 mb-4">Oops! Something went wrong 😵</h1>
      <p className="text-lg text-gray-700 mb-6">{message || "We couldn't fetch the products."}</p>
      <img
        className="w-64 mb-6"
        src="https://media.giphy.com/media/l4FGuhL4U2WyjdkaY/giphy.gif"
        alt="Error gif"
      />
      <Link href="/products">
        <a className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
          Back to Products
        </a>
      </Link>
    </div>
  );
}