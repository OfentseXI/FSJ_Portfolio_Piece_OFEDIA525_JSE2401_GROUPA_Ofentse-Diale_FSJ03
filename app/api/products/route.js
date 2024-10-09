// route.js
import { collection, query, getDocs, orderBy, where, limit as firestoreLimit, startAfter } from "firebase/firestore";
import Fuse from 'fuse.js';
import { db } from '../firebaseConfig';

export async function fetchProducts({ 
  page = 1, 
  limit = 20, 
  search = '', 
  category = '', 
  sortBy = 'price', 
  order = 'asc'
} = {}) {
  const queryConstraints = [];
  let productsQuery = collection(db, 'products');

  if (category) {
    queryConstraints.push(where('category', '==', category));
  }

  queryConstraints.push(orderBy(sortBy, order));
  queryConstraints.push(firestoreLimit(limit));

  const startIndex = (page - 1) * limit;
  if (startIndex > 0) {
    const snapshot = await getDocs(query(productsQuery, ...queryConstraints, firestoreLimit(startIndex)));
    const lastVisible = snapshot.docs[snapshot.docs.length - 1];
    queryConstraints.push(startAfter(lastVisible));
  }

  productsQuery = query(productsQuery, ...queryConstraints);
  const productSnapshot = await getDocs(productsQuery);
  
  let products = productSnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));

  if (search) {
    const fuse = new Fuse(products, { keys: ['title'], threshold: 0.3 });
    products = fuse.search(search).map(result => result.item);
  }

  return products;
}