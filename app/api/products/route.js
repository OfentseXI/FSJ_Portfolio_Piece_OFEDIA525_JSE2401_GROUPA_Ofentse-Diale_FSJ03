// // route.js
// import { collection, query, getDocs, orderBy, where, limit as firestoreLimit, startAfter } from "firebase/firestore";
// import { db } from '../firebaseConfig';

// export default async function handler(req, res) {
//   if (req.method !== 'GET') {
//     return res.status(405).json({ error: 'Method Not Allowed' });
//   }

//   try {
//     const { page = 1, limit = 20, search = '', category = '', sortBy = 'price', order = 'asc' } = req.query;

//     const queryConstraints = [];
//     let productsQuery = collection(db, 'products');

//     // Apply filters based on the category
//     if (category) {
//       queryConstraints.push(where('category', '==', category));
//     }

//     // Sorting and limiting
//     queryConstraints.push(orderBy(sortBy, order));
//     queryConstraints.push(firestoreLimit(Number(limit)));

//     const startIndex = (Number(page) - 1) * Number(limit);
//     if (startIndex > 0) {
//       const snapshot = await getDocs(query(productsQuery, ...queryConstraints, firestoreLimit(startIndex)));
//       const lastVisible = snapshot.docs[snapshot.docs.length - 1];
//       queryConstraints.push(startAfter(lastVisible));
//     }

//     productsQuery = query(productsQuery, ...queryConstraints);
//     const productSnapshot = await getDocs(productsQuery);

//     let products = productSnapshot.docs.map(doc => ({
//       id: doc.id,
//       ...doc.data(),
//     }));

//     // Search filter using Fuse.js if search term is provided
//     if (search) {
//       const Fuse = require('fuse.js');
//       const fuse = new Fuse(products, { keys: ['title'], threshold: 0.3 });
//       products = fuse.search(search).map(result => result.item);
//     }

//     // Return the paginated products array
//     return res.status(200).json({ products, page: Number(page) });
//   } catch (error) {
//     console.error("Error fetching products: ", error);
//     return res.status(500).json({ error: 'Failed to fetch products' });
//   }
// }

import { NextResponse } from "next/server";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";

export async function GET() {
  try {
    const productsQuery = collection(db, 'products');

    const snapshot = await getDocs(productsQuery);

    const products = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return new Response(JSON.stringify(products), {status: 200})
  } catch (error) {
    return NextResponse.json(
      {error: "Failed to fetch categories", details: error.message},
      {status: 500}
    )
  }
}