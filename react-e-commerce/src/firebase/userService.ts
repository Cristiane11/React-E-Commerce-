import { db } from "./firebaseConfig";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";

export const getUserData = async (uid: string) => {
  const docRef = doc(db, "users", uid);
  const snapshot = await getDoc(docRef);
  return snapshot.exists() ? snapshot.data() : null;
};

export const updateUserData = async (uid: string, data: any) => {
  const docRef = doc(db, "users", uid);
  await updateDoc(docRef, data);
};

export const deleteUserData = async (uid: string) => {
  const docRef = doc(db, "users", uid);
  await deleteDoc(docRef);
};