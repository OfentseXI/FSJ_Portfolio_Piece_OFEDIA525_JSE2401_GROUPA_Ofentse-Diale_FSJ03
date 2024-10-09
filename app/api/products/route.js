
import { collection, query, getDocs, orderBy, where, limit as firestoreLimit, startAfter } from "firebase/firestore";
import Fuse from 'fuse.js'; // For search functionality
import { db } from './firebaseConfig';

/**
 * Fetch products from Firebase with pagination, search, category, and sorting.
 *
 * @param {number} page - The page number for pagination.
 * @param {number} limit - The number of products to fetch per page.
 * @param {string} search - Search query for product names.
 * @param {string} category - Category filter.
 * @param {string} sortBy - Field to sort by (e.g., price).
 * @param {string} order - Sort order (asc/desc).
 * @param {Object} lastVisible - The last visible product snapshot for pagination.
 * @returns {Promise<Object[]>} A promise that resolves to an array of products.
 */
export async function fetchProducts({ 
  page = 1, 
  limit = 20, 
  search = '', 
  category = '', 
  sortBy = 'price', 
  order = 'asc',
  lastVisible = ''
} = {}) {
  const queryConstraints = [];

  // Start with the products collection reference
  let productsQuery = collection(db, 'products');

  // Add category filter
  if (category) {
    queryConstraints.push(where('category', '==', category));
  }

  // Add sorting
  queryConstraints.push(orderBy(sortBy, order));

  // Add pagination limit
  queryConstraints.push(firestoreLimit(limit));

  // Handle pagination with startAfter
  if (lastVisible) {
    queryConstraints.push(startAfter(lastVisible));
  }

  // Fetch the products from Firestore
  productsQuery = query(productsQuery, ...queryConstraints);
  const productSnapshot = await getDocs(productsQuery);
  
  // Use Fuse.js for search functionality
  let products = productSnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));

  // Apply search filter with Fuse.js (fuzzy search)
  if (search) {
    const fuse = new Fuse(products, { keys: ['name'], threshold: 0.3 });
    products = fuse.search(search).map(result => result.item);
  }

  // Get the last visible product to allow for pagination (next page)
  const lastVisibleProduct = productSnapshot.docs[productSnapshot.docs.length - 1];

  return { products, lastVisibleProduct };
}
