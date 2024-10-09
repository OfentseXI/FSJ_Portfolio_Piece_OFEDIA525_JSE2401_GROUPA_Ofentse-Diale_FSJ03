import { NextResponse } from "next/server";
import { collection, query, getDocs, orderBy, where, limit as firestoreLimit, startAfter } from "firebase/firestore";
import { db } from "../firebaseConfig";
import Fuse from 'fuse.js';

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    
    // Get query parameters
    const page = searchParams.get('page') || 1;
    const limit = searchParams.get('limit') || 20;
    const search = searchParams.get('search') || '';
    const category = searchParams.get('category') || '';
    const sortBy = searchParams.get('sortBy') || 'price';
    const order = searchParams.get('order') || 'asc';

    const queryConstraints = [];
    let productsQuery = collection(db, 'products');

    // Apply category filter if provided
    if (category) {
      queryConstraints.push(where('category', '==', category));
    }

    // Apply sorting and limit
    queryConstraints.push(orderBy(sortBy, order));
    queryConstraints.push(firestoreLimit(Number(limit)));

    // Calculate the starting index for pagination
    const startIndex = (Number(page) - 1) * Number(limit);
    if (startIndex > 0) {
      const snapshot = await getDocs(query(productsQuery, ...queryConstraints, firestoreLimit(startIndex)));
      const lastVisible = snapshot.docs[snapshot.docs.length - 1];
      queryConstraints.push(startAfter(lastVisible));
    }

    // Final query with constraints
    productsQuery = query(productsQuery, ...queryConstraints);
    const productSnapshot = await getDocs(productsQuery);

    let products = productSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Search functionality with Fuse.js
    if (search) {
      const fuse = new Fuse(products, { keys: ['title'], threshold: 0.3 });
      products = fuse.search(search).map(result => result.item);
    }

    // Return paginated and filtered products
    return new Response(JSON.stringify({ products, page: Number(page) }), { status: 200 });

  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch products", details: error.message },
      { status: 500 }
    );
  }
}
