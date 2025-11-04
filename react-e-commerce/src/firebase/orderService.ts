import { db } from "./firebaseConfig";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";

// Save a new order
export const createOrder = async (userId: string, cartItems: any[]) => {
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.count, 0);
  const order = {
    userId,
    items: cartItems,
    totalPrice,
    createdAt: new Date().toISOString(),
  };
  await addDoc(collection(db, "orders"), order);
};

// Fetch all orders for a user
export const getUserOrders = async (userId: string) => {
  const q = query(collection(db, "orders"), where("userId", "==", userId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};
