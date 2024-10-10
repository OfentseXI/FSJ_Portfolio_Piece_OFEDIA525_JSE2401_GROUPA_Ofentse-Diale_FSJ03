import { NextResponse } from 'next/server';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

export async function GET(req, { params }) {
  try {
    const { id } = params;

    // Fetch the document from Firestore by ID
    const docRef = doc(db, 'products', id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const productData = {
        id: docSnap.id,
        ...docSnap.data(),
      };
      
      return NextResponse.json(productData);
    } else {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 });
  }
}