import admin from 'firebase-admin';
import { getApps, initializeApp, applicationDefault } from 'firebase-admin/app'; 
import { cert } from 'firebase-admin/app';

// Ensure you have your service account key properly set up in your environment variables
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);

// Function to initialize Firebase Admin SDK
export const initFirebaseAdmin = () => {
  // Initialize app only if there are no existing apps
  if (getApps().length === 0) {
    initializeApp({
      credential: cert(serviceAccount),
    });
  }
};



// Export Firestore database for server-side operations
export const dbAdmin = admin.firestore();

// Optional: Export Firebase Auth (if needed for token verification)
export const authAdmin = admin.auth();

// Verify Firebase ID token
export const verifyIdToken = async (token) => {
  try {
    const decodedToken = await authAdmin.verifyIdToken(token);
    return decodedToken;
  } catch (error) {
    throw new Error('Unauthorized');
  }
};
