import { db } from "./firebaseConfig";
import { doc, setDoc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";

// Create: Add new user
export const createUserProfile = async (uid: string, userData: any) => {
  await setDoc(doc(db, "users", uid), userData);
};

// Read: Get user profile
export const getUserProfile = async (uid: string) => {
  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? docSnap.data() : null;
};

// Update: Edit user profile
export const updateUserProfile = async (uid: string, updatedData: any) => {
  const docRef = doc(db, "users", uid);
  await updateDoc(docRef, updatedData);
};

// Delete: Remove user
export const deleteUserProfile = async (uid: string) => {
  const docRef = doc(db, "users", uid);
  await deleteDoc(docRef);
};

