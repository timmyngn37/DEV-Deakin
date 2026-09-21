// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, validatePassword, type User } from "firebase/auth";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);

export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);

export const createAuthUserWithEmailAndPassword = (email: string, password: string) =>
  createUserWithEmailAndPassword(auth, email, password);
export const signInAuthUserWithEmailAndPassword = (email: string, password: string) =>
  signInWithEmailAndPassword(auth, email, password);
export const validateAuthPassword = (password: string) =>
  validatePassword(auth, password);
export const updateAuthUserDisplayName = (user: User, displayName: string) =>
  updateProfile(user, { displayName });

export async function createUserDocFromAuth(user: User, additionalInformation: Record<string, unknown> = {}) {
  const userDocRef = doc(db, "users", user.uid);
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    await setDoc(userDocRef, {
      displayName: user.displayName,
      email: user.email,
      createdAt: new Date(),
      ...additionalInformation,
    });
  }

  return userDocRef;
}