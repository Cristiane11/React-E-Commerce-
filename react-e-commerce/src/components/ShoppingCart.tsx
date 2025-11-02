// src/components/ShoppingCart.tsx
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../app/store";
import { removeFromCart, clearCart } from "../features/cartSlice";
import { db, auth } from "../firebase/firebaseConfig";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

const ShoppingCart: React.FC = () => {
  const items = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const user = auth.currentUser;

  const totalPrice = items.reduce(
    (sum, item) => sum + (item.price ?? 0) * item.count,
    0
  );

  // Save order in Firestore
  const handleCheckout = async () => {
    if (!user) {
      alert("Please log in to complete checkout.");
      return;
    }

    try {
      const orderData = {
        userId: user.uid,
        userEmail: user.email,
        items: items.map((item) => ({
          id: item.id,
          title: item.title,
          price: item.price,
          count: item.count,
        })),
        totalPrice,
        createdAt: serverTimestamp(),
      };

      // Add to Firestore collection "orders"
      await addDoc(collection(db, "orders"), orderData);

      dispatch(clearCart());
      alert("✅ Checkout successful! Order saved in Firestore.");
    } catch (error) {
      console.error("Error saving order:", error);
      alert("❌ Error during checkout. Please try again.");
    }
  };

  return (
    <div className="shopping-cart">
      <h2>Shopping Cart</h2>
      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul>
            {items.map((item) => (
              <li key={item.id}>
                {item.title} x {item.count} - ${item.price.toFixed(2)}
                <button onClick={() => dispatch(removeFromCart(item.id))}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <p>Total Items: {items.reduce((sum, i) => sum + i.count, 0)}</p>
          <p>Total Price: ${totalPrice.toFixed(2)}</p>
          <button onClick={handleCheckout}>Checkout</button>
        </>
      )}
    </div>
  );
};

export default ShoppingCart;
