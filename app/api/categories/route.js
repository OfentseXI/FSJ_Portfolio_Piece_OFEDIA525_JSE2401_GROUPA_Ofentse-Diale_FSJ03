import { NextResponse } from "next/server";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";

export async function GET() {
  try {
    const categoriesRef = collection(db, 'categories');

    const snapshot = await getDocs(categoriesRef);

    const categories = snapshot.docs.map((doc) => ({
    //   id: doc.id,
      ...doc.data(),
    }));

    return new Response(JSON.stringify(categories), {status: 200})
  } catch (error) {
    return NextResponse.json(
      {error: "Failed to fetch categories", details: error.message},
      {status: 500}
    )
  }
}