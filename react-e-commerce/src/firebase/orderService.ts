import { db } from "./firebaseConfig";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";

export const createOrder = async (userId: string, cartItems: any[]) => {
  const ordersRef = collection(db, "orders");
  const total = cartItems.reduce((sum, item) => sum + item.price * item.count, 0);

  await addDoc(ordersRef, {
    userId,
    items: cartItems,
    total,
    createdAt: new Date(),
  });
};

export const getOrdersByUser = async (userId: string) => {
  const ordersRef = collection(db, "orders");
  const q = query(ordersRef, where("userId", "==", userId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};
