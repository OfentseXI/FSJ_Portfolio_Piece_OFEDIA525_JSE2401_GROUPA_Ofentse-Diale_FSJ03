import { collection, query, getDocs, orderBy } from "firebase/firestore";
import { db } from '../firebaseConfig';

/**
 * Fetch all categories from Firestore.
 * @returns {Promise<string[]>} A promise that resolves to an array of category names.
 */
export async function fetchCategories() {
  try {
    const categoriesQuery = query(collection(db, 'categories'), orderBy('name'));
    const snapshot = await getDocs(categoriesQuery);
    return snapshot.docs.map(doc => doc.data().name);
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
}