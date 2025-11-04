import { db } from "../firebase/firebaseConfig";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

// Fetch all products
export const getProducts = async () => {
  const snapshot = await getDocs(collection(db, "products"));
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// Add a new product
export const addProduct = async (productData: any) => {
  await addDoc(collection(db, "products"), productData);
};

// Update existing product
export const updateProduct = async (id: string, updatedData: any) => {
  await updateDoc(doc(db, "products", id), updatedData);
};

// Delete a product
export const deleteProduct = async (id: string) => {
  await deleteDoc(doc(db, "products", id));
};