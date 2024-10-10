import { NextResponse } from "next/server";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";

export async function GET(request, { params }) {
  const id = params.id;

  try {
    const productDetailsRef = doc(db, 'productDetails', id);
    const productDetailsSnap = await getDoc(productDetailsRef);

    if (!productDetailsSnap.exists()) {
      return NextResponse.json(
        { error: "Product details not found" },
        { status: 404 }
      );
    }

    const productDetails = {
      id: productDetailsSnap.id,
      ...productDetailsSnap.data(),
    };

    return NextResponse.json({ productDetails });
  } catch (error) {
    console.error('Failed to fetch product details:', error);
    return NextResponse.json(
      { error: "Failed to fetch product details" },
      { status: 500 }
    );
  }
}