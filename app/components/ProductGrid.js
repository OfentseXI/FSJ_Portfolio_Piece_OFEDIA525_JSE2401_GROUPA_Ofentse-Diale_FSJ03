import Link from 'next/link';

export default function ProductGrid({ products }) {
  return (
    <div className="grid justify-center">
      <div className="max-w-screen-xl mx-auto mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="flex flex-col max-h-[130rem] cursor-pointer max-w-80 hover:-translate-y-1 hover:scale-105 duration-300 bg-white border border-slate-200 shadow shadow-slate-950/5 rounded overflow-hidden"
          >
            <img
              className="object-contain h-48 mt-3"
              src={product.images[0]}
              alt={product.title}
            />
            <div className="flex-1 flex flex-col p-6">
              <header className="mb-2">
                <h2 className="text-lg line-clamp-2 font-extrabold leading-snug text-slate-600">
                  {product.title}
                </h2>
              </header>
              <p className="text-base font-extrabold text-slate-500 leading-snug">
                ${product.price}
              </p>
              <div className="flex items-left mb-2">
                <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                  {product.category}
                </span>
              </div>
              <Link
                href={`/products/${product.id}`}
                className="mt-4 inline-block text-center text-blue-600 hover:text-blue-800"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
