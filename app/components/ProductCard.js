import Link from 'next/link';

export default function ProductCard({ product }) {
  return (
    <div className="card">
      <img src={product.images[0]} alt={product.title} />
      <h2>{product.title}</h2>
      <p>{product.price}</p>
      <p>{product.category}</p>
      <Link href={`/products/${product.id}`}>View Details</Link>
    </div>
  );
}