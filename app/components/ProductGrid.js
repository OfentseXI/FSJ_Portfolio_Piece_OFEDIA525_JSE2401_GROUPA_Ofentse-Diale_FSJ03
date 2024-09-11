import Link from 'next/link';

export default function ProductGrid({ products }) {
  return (
    <div className="grid justify-center">
      <div className="max-w-screen-xl mx-auto mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <Link key={product.id} href={`/products/${product.id}`} className="flex flex-col max-h-[130rem] cursor-pointer max-w-80 hover:-translate-y-1 hover:scale-105 duration-300 bg-white border border-slate-200 shadow shadow-slate-950/5 rounded overflow-hidden">
            <img className="object-contain h-48 mt-3" src={product.images[0]} alt={product.title} />
            <div className="flex-1 flex flex-col p-6">
              <div className="flex-1">
                <header className="mb-2 flex-2">
                  <h2 className="text-lg line-clamp-2 font-extrabold leading-snug text-slate-600">{product.title}</h2>
                </header>
              </div>
              <div className="flex items-left -ml-2 mb-2">
                {Array(Math.round(product.rating?.rate || 0)).fill().map((_, index) => (
                  <svg key={index} className="w-4 h-4 text-yellow-300 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                ))}
                {Array(5 - Math.round(product.rating?.rate || 0)).fill().map((_, index) => (
                  <svg key={index} className="w-4 h-4 ms-1 text-gray-300 dark:text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                ))}
              </div>
              <div className="text-base line-clamp-2 font-extrabold text-slate-500 leading-snug">
                <h2>$ {product.price}</h2>
              </div>
              <div className="flex mt-1 space-x-2 my-3">
                <div className="justify-start flex-1">
                  <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                    {product.category}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
