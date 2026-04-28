import admin from 'firebase-admin';

if (!admin.apps.length) {
  try {
    if (process.env.FIREBASE_ADMIN_SDK_JSON) {
      admin.initializeApp({
        credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_ADMIN_SDK_JSON)),
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      });
    }
  } catch (error) {
    console.error('Firebase admin initialization error', error.stack);
  }
}

// Fallback objects if admin app isn't ready
const mockDoc = { 
  id: "mock-id",
  set: async () => {}, 
  update: async () => {}, 
  get: async () => ({ id: "mock-id", data: () => ({ status: "COMPLETED" }) }) 
};
export const adminDb = admin.apps.length ? admin.firestore() : { collection: () => ({ doc: () => mockDoc }) };
export const adminStorage = admin.apps.length ? admin.storage() : null;
export const adminAuth = admin.apps.length ? admin.auth() : null;
