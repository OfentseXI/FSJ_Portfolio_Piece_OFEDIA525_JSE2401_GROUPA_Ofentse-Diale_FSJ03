import { collection, query, getDocs, orderBy, where, limit as firestoreLimit } from "firebase/firestore";
import { db } from './firebaseConfig'; // Import Firestore config

/**
 * Fetch products from Firebase with pagination, search, category, and sorting.
 *
 * @param {number} page - The page number for pagination.
 * @param {number} limit - The number of products to fetch per page.
 * @param {string} search - Search query for product names.
 * @param {string} category - Category filter.
 * @param {string} sortBy - Field to sort by.
 * @param {string} order - Sort order (asc/desc).
 * @returns {Promise<Object[]>} A promise that resolves to an array of products.
 */
export async function fetchProducts({ 
  page = 1, 
  limit = 20, 
  search = '', 
  category = '', 
  sortBy = 'id', 
  order = 'asc' 
} = {}) {
  const skip = (page - 1) * limit; // For Firestore, you may use `startAfter` for pagination

  // Start with the products collection reference
  let productsQuery = collection(db, 'products');

  const queryConstraints = [];

  // Add search filter
  if (search) {
    queryConstraints.push(where('name', '>=', search), where('name', '<=', search + '\uf8ff'));
  }

  // Add category filter
  if (category) {
    queryConstraints.push(where('category', '==', category));
  }

  // Add sorting
  if (sortBy) {
    queryConstraints.push(orderBy(sortBy, order));
  }

  // Add pagination limit
  queryConstraints.push(firestoreLimit(limit));

  // Combine the query constraints into a single query
  productsQuery = query(productsQuery, ...queryConstraints);

  // Fetch the products from Firestore
  const productSnapshot = await getDocs(productsQuery);

  // Convert Firestore documents to an array of products
  const products = productSnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));

  return products;
}
