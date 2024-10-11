import { NextResponse } from "next/server";
import { collection, query, getDocs, orderBy, where, limit, startAfter, getCountFromServer } from "firebase/firestore";
import { db } from "../../../firebaseConfig";
import Fuse from 'fuse.js';

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    
    const page = parseInt(searchParams.get('page') || '1', 10);
    const pageSize = parseInt(searchParams.get('limit') || '20', 10);
    const search = searchParams.get('search') || '';
    const category = searchParams.get('category') || '';
    const sortBy = searchParams.get('sortBy') || 'id';
    const order = searchParams.get('order') || 'asc';

    let productsQuery = collection(db, 'products');
    const queryConstraints = [];

    if (category) {
      queryConstraints.push(where('category', '==', category));
    }

    queryConstraints.push(orderBy(sortBy, order));

    // Get total count of products (for pagination)
    const countQuery = query(productsQuery, ...queryConstraints);
    const countSnapshot = await getCountFromServer(countQuery);
    const totalProducts = countSnapshot.data().count;

    // Apply pagination
    queryConstraints.push(limit(pageSize));
    if (page > 1) {
      const prevPageQuery = query(productsQuery, ...queryConstraints, limit((page - 1) * pageSize));
      const prevPageSnapshot = await getDocs(prevPageQuery);
      const lastVisible = prevPageSnapshot.docs[prevPageSnapshot.docs.length - 1];
      queryConstraints.push(startAfter(lastVisible));
    }

    const finalQuery = query(productsQuery, ...queryConstraints);
    const snapshot = await getDocs(finalQuery);

    let products = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    // Apply search after fetching from Firestore
    if (search) {
      const fuse = new Fuse(products, { keys: ['title'], threshold: 0.3 });
      products = fuse.search(search).map(result => result.item);
    }

    return NextResponse.json({ 
      products, 
      page, 
      totalPages: Math.ceil(totalProducts / pageSize),
      totalProducts
    });
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return NextResponse.json({ error: "Failed to fetch products", details: error.message }, { status: 500 });
  }
}