import { NextResponse } from 'next/server';
import { verifyIdToken, initFirebaseAdmin } from '../../../../firebaseAdmin'; // Import initFirebaseAdmin
import { getFirestore, FieldValue } from 'firebase-admin/firestore';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

// Initialize Firebase Admin SDK
initFirebaseAdmin(); // Call the function here

const db = getFirestore();


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


// ADD Review (POST request)
export async function POST(req, { params }) {
    try {
      const { id } = params;
      const token = req.headers.get('Authorization')?.split('Bearer ')[1];
      
      if (!token) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
  
      const user = await verifyIdToken(token);
      const body = await req.json();
      const { rating, comment } = body;
  
      if (!rating || !comment) {
        return NextResponse.json({ error: 'Rating and comment are required' }, { status: 400 });
      }
  
      const review = {
        id: db.collection('products').doc().id, // Assign a unique ID for the review
        rating,
        comment,
        date: FieldValue.serverTimestamp(), // Use Firestore's timestamp
        reviewerEmail: user.email,
        reviewerName: user.name || 'Anonymous',
      };
  
      const productRef = db.collection('products').doc(id);
      await productRef.update({
        reviews: FieldValue.arrayUnion(review),
      });
  
      return NextResponse.json({ message: 'Review added successfully' });
    } catch (error) {
      console.error('Error adding review:', error);
      return NextResponse.json({ error: 'Failed to add review' }, { status: 500 });
    }
  }

// EDIT Review (PUT request)
export async function PUT(req, { params }) {
  try {
    const { id } = params;
    const token = req.headers.get('Authorization')?.split('Bearer ')[1];

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await verifyIdToken(token);
    const body = await req.json();
    const { reviewId, rating, comment } = body;

    const productRef = doc(db, 'products', id);
    const productSnap = await getDoc(productRef);

    if (!productSnap.exists()) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    const productData = productSnap.data();
    const updatedReviews = productData.reviews.map((review) =>
      review.id === reviewId && review.reviewerEmail === user.email
        ? { ...review, rating, comment, date: new Date().toISOString() }
        : review
    );

    await updateDoc(productRef, { reviews: updatedReviews });

    return NextResponse.json({ message: 'Review updated successfully' });
  } catch (error) {
    console.error('Error updating review:', error);
    return NextResponse.json({ error: 'Failed to update review' }, { status: 500 });
  }
}

// DELETE Review (DELETE request)
export async function DELETE(req, { params }) {
  try {
    const { id } = params;
    const token = req.headers.get('Authorization')?.split('Bearer ')[1];

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await verifyIdToken(token);
    const body = await req.json();
    const { reviewId } = body;

    const productRef = doc(db, 'products', id);
    const productSnap = await getDoc(productRef);

    if (!productSnap.exists()) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    const productData = productSnap.data();
    const updatedReviews = productData.reviews.filter(
      (review) => review.id !== reviewId || review.reviewerEmail !== user.email
    );

    await updateDoc(productRef, { reviews: updatedReviews });

    return NextResponse.json({ message: 'Review deleted successfully' });
  } catch (error) {
    console.error('Error deleting review:', error);
    return NextResponse.json({ error: 'Failed to delete review' }, { status: 500 });
  }
}
